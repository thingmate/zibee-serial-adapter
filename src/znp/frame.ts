import { SOF, type CommandType as CommandTypeT, type Subsystem as SubsystemT } from './constants.ts';

export interface ZnpFrame {
  readonly type: CommandTypeT;
  readonly subsystem: SubsystemT;
  readonly commandId: number;
  readonly payload: Uint8Array;
  readonly fcs: number;
}

export function buildCmd0(type: CommandTypeT, subsystem: SubsystemT): number {
  return (type << 5) | (subsystem & 0x1f);
}

export function parseCmd0(cmd0: number): { type: CommandTypeT; subsystem: SubsystemT } {
  return {
    type: ((cmd0 >> 5) & 0x07) as CommandTypeT,
    subsystem: (cmd0 & 0x1f) as SubsystemT,
  };
}

export function calcFcs(len: number, cmd0: number, cmd1: number, payload: Uint8Array): number {
  let fcs = len ^ cmd0 ^ cmd1;
  for (let i = 0; i < payload.length; i++) {
    fcs ^= payload[i];
  }
  return fcs;
}

export function buildFrame(type: CommandTypeT, subsystem: SubsystemT, commandId: number, payload: Uint8Array): Uint8Array {
  const len = payload.length;
  const cmd0 = buildCmd0(type, subsystem);
  const fcs = calcFcs(len, cmd0, commandId, payload);

  const frame = new Uint8Array(5 + len);
  frame[0] = SOF;
  frame[1] = len;
  frame[2] = cmd0;
  frame[3] = commandId;
  frame.set(payload, 4);
  frame[4 + len] = fcs;
  return frame;
}
