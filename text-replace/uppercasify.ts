import { TransformCallback, pipeline } from 'stream';
import { createGunzip, createGzip } from 'zlib';
import { Transform } from 'stream';

class Uppercasify extends Transform {
  _transform(
    chunk: any,
    encoding: BufferEncoding,
    callback: TransformCallback
  ): void {
    this.push(chunk.toString().toUpperCase());
    callback();
  }
}

pipeline(
  process.stdin,
  createGunzip(),
  new Uppercasify(),
  createGzip(),
  process.stdout,
  (err) => {
    console.error(err);
  }
);
