import * as fs from 'fs';
import { Transform, TransformCallback, pipeline } from 'stream';

console.log(process.argv[2]);

class LineSplitterStream extends Transform {
  private _line: string;
  private _tail: string;
  constructor(options: any = {}) {
    super();
    this._line = '';
    this._tail = '';
  }

  // _transform
  // while there is not a new line in the data,
  // keep pushing to a string
  // else, call the internal push method
  _transform(
    chunk: any,
    encoding: BufferEncoding,
    callback: TransformCallback
  ) {
    const lines = [];
    let str: string = chunk.toString();

    let done = false;
    while (!done) {
      console.log(this._tail.toString(), 'tail', str);
      const newLineIndex = str.indexOf('\n');
      if (newLineIndex === -1) {
        done = true;
        lines.push(str);
        continue;
      }

      lines.push(str.slice(0, newLineIndex));
      str = str.slice(newLineIndex + 1);
    }

    if (str) {
      this._tail = str;
    }
    callback();
  }
}

pipeline(
  fs.createReadStream(process.argv[2], {
    highWaterMark: 400,
  }),
  new LineSplitterStream(),
  fs.createWriteStream('./dest.txt'),
  (err) => {
    if (err) {
      console.error(err);
    }
  }
);
// take in stream of text
// transform stream 1 - split the stream of text into lines
// transform stream 2 - replace the word passed as an argument 1
// write to dest passed as arg 2
