import { Readable } from 'stream';

export class TransformToLine extends Readable {
  constructor(options: any) {
    super(options);
  }

  _read(chunk: any) {
    console.log(chunk);
  }
}
