import * as fs from 'fs';
import { Transform, TransformCallback, pipeline } from 'stream';
import { TransformToLine } from './line-replace.js';

console.log(process.argv[2]);

class LineSplitterStream extends Transform {
  private _line: string;
  private _tail: string;
  constructor(options: any = {}) {
    super({
      ...options,
      objectMode: true,
    });
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
    let str: string = this._tail + chunk.toString();
    let done = false;
    while (!done) {
      const newLineIndex = str.indexOf('\n');
      if (newLineIndex === -1) {
        done = true;
        continue;
      }

      lines.push(str.slice(0, newLineIndex));
      str = str.slice(newLineIndex + 1);
    }

    this._tail = str ?? '';
    this.push(lines);
    callback();
  }
  _flush(callback: TransformCallback): void {
    this.push([this._tail]);
    callback();
  }
}

class ReplaceStrStream extends Transform {
  replaceStr: string;
  replacement: string;
  constructor(options: any = {}, replaceStr: string, replacement: string) {
    super({
      ...options,
      objectMode: true,
    });

    this.replaceStr = replaceStr;
    this.replacement = replacement;
  }

  _transform(
    chunk: string[],
    encoding: BufferEncoding,
    callback: TransformCallback
  ): void {
    if (!Array.isArray(chunk)) {
      throw new Error(
        `Replace stream expected array but received ${typeof chunk}`
      );
    }

    this.push(
      chunk
        .map((s) => s.replace(this.replaceStr, this.replacement))
        .join('\n') + '\n'
    );

    callback();
  }

  _flush(callback: TransformCallback): void {
    callback();
  }
}

pipeline(
  fs.createReadStream(process.argv[2], {
    highWaterMark: 500,
  }),
  new LineSplitterStream(),
  new ReplaceStrStream({}, 'hello', 'world.js'),
  fs.createWriteStream(process.argv[3]),
  (err) => {
    if (err) {
      console.error(err);
    }
  }
);
