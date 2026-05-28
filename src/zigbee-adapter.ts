import { CommandType, Subsystem, SYS_PING, ZDO_MGMT_PERMIT_JOIN_REQ, AF_REGISTER, AF_DATA_REQUEST } from './znp/constants.ts';
import type { Subsystem as SubsystemT } from './znp/constants.ts';
import { buildFrame } from './znp/frame.ts';
import type { ZnpFrame } from './znp/frame.ts';
import { ZnpParser } from './znp/parser.ts';

export interface ZigbeeAdapterOptions {
  baudRate?: number;
  requestTimeoutMs?: number;
  srcEndpoint?: number;
}

export interface ZCLCommandFrame {
  readonly device: number | bigint; // u16 network address | u64 IEEE address
  readonly endpoint: number; // u8
  readonly cluster: number; // u16
  readonly clusterSpecific: boolean;
  readonly direction: ZCLCommandFrameDirection;
  readonly command: number; // u8
  readonly payload: Uint8Array;
}

export type ZCLCommandFrameDirection = 'client-to-server' /* 0 */ | 'server-to-client' /* 1 */;

interface PendingRequest {
  resolve: (frame: ZnpFrame) => void;
  reject: (err: Error) => void;
  timer: ReturnType<typeof setTimeout>;
}

export class ZigbeeAdapter extends EventTarget {
  private port: SerialPort;
  private baudRate: number;
  private requestTimeoutMs: number;
  private srcEndpoint: number;
  private reader: ReadableStreamDefaultReader<Uint8Array> | null = null;
  private writer: WritableStreamDefaultWriter<Uint8Array> | null = null;
  private running = false;
  private parser: ZnpParser;
  private pending = new Map<string, PendingRequest>();
  private zclSeq = 0;
  private transId = 0;

  constructor(port: SerialPort, options: ZigbeeAdapterOptions = {}) {
    super();
    this.port = port;
    this.baudRate = options.baudRate ?? 115200;
    this.requestTimeoutMs = options.requestTimeoutMs ?? 5000;
    this.srcEndpoint = options.srcEndpoint ?? 1;
    this.parser = new ZnpParser((frame) => this.handleZnpFrame(frame));
  }

  async start(): Promise<void> {
    if (this.running) {
      throw new Error('Adapter already started');
    }

    if (this.port.readable === null || this.port.writable === null) {
      await this.port.open({
        baudRate: this.baudRate,
        dataBits: 8,
        stopBits: 1,
        parity: 'none',
      });
    }

    this.reader = this.port.readable.getReader();
    this.writer = this.port.writable.getWriter();
    this.running = true;

    this.readLoop().catch((err: unknown) => {
      if (this.running) {
        this.dispatchEvent(new ErrorEvent('error', { error: err }));
      }
    });

    await this.registerEndpoint();
  }

  async stop(): Promise<void> {
    if (!this.running) {
      return;
    }
    this.running = false;

    for (const [, p] of this.pending) {
      clearTimeout(p.timer);
      p.reject(new Error('Adapter stopped'));
    }
    this.pending.clear();

    await this.reader?.cancel().catch(() => {});
    this.reader?.releaseLock();
    this.writer?.releaseLock();

    this.reader = null;
    this.writer = null;
  }

  /**
   * Register our local source endpoint with the AF layer.
   * This is required before any AF_DATA_REQUEST can be sent.
   */
  private async registerEndpoint(): Promise<void> {
    const ep = this.srcEndpoint;

    // AF_REGISTER payload:
    //   Endpoint        uint8
    //   AppProfId       uint16 LE  (0x0104 = ZHA)
    //   AppDeviceId     uint16 LE  (0x0005 = Configuration Tool)
    //   AppDevVer       uint8      (0)
    //   LatencyReq      uint8      (0 = no latency requirements)
    //   AppNumInClusters uint8     (0)
    //   AppNumOutClusters uint8    (0)
    const payload = new Uint8Array([
      ep,
      0x04, 0x01, // AppProfId = 0x0104
      0x05, 0x00, // AppDeviceId = 0x0005
      0x00,       // AppDevVer
      0x00,       // LatencyReq
      0x00,       // AppNumInClusters
      0x00,       // AppNumOutClusters
    ]);

    const response = await this.request(Subsystem.AF, AF_REGISTER, payload);

    if (response.payload.length < 1) {
      throw new Error('Invalid AF_REGISTER SRSP: missing status byte');
    }

    const status = response.payload[0];
    if (status !== 0) {
      throw new Error(
        `AF_REGISTER failed with status 0x${status.toString(16).padStart(2, '0')}`
      );
    }
  }

  /**
   * Enable or disable network join (permit joining) for a given duration.
   *
   * @param durationSeconds - 0 to disable, 1-254 for timed permit, 255 for always on.
   */
  async permitJoin(durationSeconds: number): Promise<void> {
    if (durationSeconds < 0 || durationSeconds > 255) {
      throw new RangeError('durationSeconds must be between 0 and 255');
    }

    const payload = new Uint8Array([0xfc, 0xff, durationSeconds, 0x00]);
    const response = await this.request(Subsystem.ZDO, ZDO_MGMT_PERMIT_JOIN_REQ, payload);

    if (response.payload.length < 1) {
      throw new Error('Invalid SRSP: missing status byte');
    }

    const status = response.payload[0];
    if (status !== 0) {
      throw new Error(`Permit join failed with status 0x${status.toString(16).padStart(2, '0')}`);
    }
  }

  /**
   * Ping the network processor to verify the serial link is alive.
   *
   * @returns The 16-bit capabilities mask reported by the device.
   */
  async ping(): Promise<number> {
    const response = await this.request(Subsystem.SYS, SYS_PING, new Uint8Array(0));

    if (response.payload.length < 2) {
      throw new Error('Invalid SYS_PING SRSP: expected 2 bytes');
    }

    return response.payload[0] | (response.payload[1] << 8);
  }

  /**
   * Send a ZCL command frame to a device.
   *
   * @param frame - The ZCL command to send.
   */
  async send(frame: ZCLCommandFrame): Promise<void> {
    if (typeof frame.device === 'bigint') {
      throw new Error('64-bit IEEE addresses are not yet supported; pass a 16-bit network address');
    }

    const dstAddr = frame.device;
    if (dstAddr < 0 || dstAddr > 0xffff) {
      throw new RangeError('device network address must be a 16-bit value');
    }
    if (frame.endpoint < 0 || frame.endpoint > 0xff) {
      throw new RangeError('endpoint must be an 8-bit value');
    }
    if (frame.cluster < 0 || frame.cluster > 0xffff) {
      throw new RangeError('cluster must be a 16-bit value');
    }
    if (frame.command < 0 || frame.command > 0xff) {
      throw new RangeError('command must be an 8-bit value');
    }

    // Build ZCL frame --------------------------------------------------------
    let frameControl = 0;
    if (frame.clusterSpecific) {
      frameControl |= 0x01; // cluster-specific command
    }
    if (frame.direction === 'server-to-client') {
      frameControl |= 0x08; // direction bit
    }
    frameControl |= 0x10; // disable default response

    const zclPayload = new Uint8Array(3 + frame.payload.length);
    zclPayload[0] = frameControl;
    zclPayload[1] = this.zclSeq++ & 0xff;
    zclPayload[2] = frame.command;
    zclPayload.set(frame.payload, 3);

    // Build AF_DATA_REQUEST payload ------------------------------------------
    const afPayload = new Uint8Array(10 + zclPayload.length);
    afPayload[0] = dstAddr & 0xff;
    afPayload[1] = (dstAddr >> 8) & 0xff;
    afPayload[2] = frame.endpoint;
    afPayload[3] = this.srcEndpoint;
    afPayload[4] = frame.cluster & 0xff;
    afPayload[5] = (frame.cluster >> 8) & 0xff;
    afPayload[6] = this.transId++ & 0xff;
    afPayload[7] = 0x00; // Options
    afPayload[8] = 0x1e; // Radius
    afPayload[9] = zclPayload.length;
    afPayload.set(zclPayload, 10);

    const response = await this.request(Subsystem.AF, AF_DATA_REQUEST, afPayload);

    if (response.payload.length < 1) {
      throw new Error('Invalid AF_DATA_REQUEST SRSP: missing status byte');
    }

    const status = response.payload[0];
    if (status !== 0) {
      throw new Error(`AF_DATA_REQUEST failed with status 0x${status.toString(16).padStart(2, '0')}`);
    }
  }

  private async readLoop(): Promise<void> {
    try {
      while (this.running) {
        const result = await this.reader!.read();
        if (result.done) {
          break;
        }
        if (result.value) {
          this.parser.feed(result.value);
        }
      }
    } finally {
      this.running = false;
    }
  }

  private handleZnpFrame(frame: ZnpFrame): void {
    if (frame.type === CommandType.SRSP) {
      const key = this.frameKey(frame.subsystem, frame.commandId);
      const pending = this.pending.get(key);
      if (pending) {
        clearTimeout(pending.timer);
        this.pending.delete(key);
        pending.resolve(frame);
      }
      return;
    }

    if (frame.type === CommandType.AREQ) {
      // TODO: Step 4 – dispatch AF_INCOMING_MSG as 'receive' event, etc.
    }
  }

  private frameKey(subsystem: SubsystemT, commandId: number): string {
    return `${subsystem}:${commandId}`;
  }

  private async request(subsystem: SubsystemT, commandId: number, payload: Uint8Array): Promise<ZnpFrame> {
    if (!this.running || this.writer === null) {
      throw new Error('Adapter not started');
    }

    const key = this.frameKey(subsystem, commandId);
    if (this.pending.has(key)) {
      throw new Error(`Request already pending for ${key}`);
    }

    const frame = buildFrame(CommandType.SREQ, subsystem, commandId, payload);

    return new Promise((resolve, reject) => {
      const timer = setTimeout(() => {
        this.pending.delete(key);
        reject(new Error(`Request ${key} timed out`));
      }, this.requestTimeoutMs);

      this.pending.set(key, { resolve, reject, timer });

      this.writer!.write(frame).then(
        () => {},
        (err: unknown) => {
          if (this.pending.has(key)) {
            clearTimeout(timer);
            this.pending.delete(key);
            reject(err instanceof Error ? err : new Error(String(err)));
          }
        },
      );
    });
  }
}
