import { SOF } from './constants.ts';
import { calcFcs, parseCmd0 } from './frame.ts';
import type { ZnpFrame } from './frame.ts';

type ParserState = 'SOF' | 'LEN' | 'CMD0' | 'CMD1' | 'DATA' | 'FCS';

export class ZnpParser {
  private state: ParserState = 'SOF';
  private len = 0;
  private cmd0 = 0;
  private cmd1 = 0;
  private data: number[] = [];
  private readonly onFrame: (frame: ZnpFrame) => void;

  constructor(onFrame: (frame: ZnpFrame) => void) {
    this.onFrame = onFrame;
  }

  feed(chunk: Uint8Array): void {
    for (let i = 0; i < chunk.length; i++) {
      this.processByte(chunk[i]);
    }
  }

  private processByte(byte: number): void {
    switch (this.state) {
      case 'SOF':
        if (byte === SOF) {
          this.state = 'LEN';
        }
        break;
      case 'LEN':
        this.len = byte;
        this.data = [];
        this.state = 'CMD0';
        break;
      case 'CMD0':
        this.cmd0 = byte;
        this.state = 'CMD1';
        break;
      case 'CMD1':
        this.cmd1 = byte;
        this.state = this.len === 0 ? 'FCS' : 'DATA';
        break;
      case 'DATA':
        this.data.push(byte);
        if (this.data.length === this.len) {
          this.state = 'FCS';
        }
        break;
      case 'FCS': {
        const payload = new Uint8Array(this.data);
        const { type, subsystem } = parseCmd0(this.cmd0);
        const expectedFcs = calcFcs(this.len, this.cmd0, this.cmd1, payload);
        if (byte === expectedFcs) {
          this.onFrame({
            type,
            subsystem,
            commandId: this.cmd1,
            payload,
            fcs: byte,
          });
        }
        this.state = 'SOF';
        break;
      }
    }
  }
}
