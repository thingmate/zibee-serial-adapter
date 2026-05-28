export interface ZCLCommandFrame {
    readonly device: number | bigint; // u16 | u64
    readonly endpoint: number; // u8
    readonly cluster: number; // u16
    readonly clusterSpecific: boolean;
    readonly direction: ZCLCommandFrameDirection;
    readonly command: number; // u8
    readonly payload: Uint8Array;
}

export type ZCLCommandFrameDirection = 'client-to-server' /* 0 */ | 'server-to-client' /* 1 */;

export class ZigbeeAdapter extends EventTarget {

  constructor(port: SerialPort) {
    // TODO implement
  }

  send(frame: ZCLCommandFrame): Promise<void> {
    // TODO implement
  }

  // TODO implement "receive" event, receiving a `ZCLCommandFrame`

}
