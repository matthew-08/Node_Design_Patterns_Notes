import { Readable, Transform } from 'stream';
import { pipeline } from 'stream/promises';
import { createReadStream, createWriteStream } from 'fs';

export const concatFiles = async (files: string[], dest: string) => {
  return pipeline(
    Readable.from(files, {
      objectMode: true,
    }),
    new Transform({
      transform(file: string, encoding, callback) {
        console.log('test', file);
        const destStream = createWriteStream(dest, {
          flags: 'a',
        });

        const src = createReadStream(file);
        src.pipe(destStream);
        src.on('end', () => {
          destStream.close();
          callback();
        });
        src.on('error', callback);
      },
      objectMode: true,
    })
  );
};

const files = process.argv.slice(2, process.argv.length - 1);

concatFiles(files, process.argv[process.argv.length - 1]).then((r) =>
  console.log('complete')
);
