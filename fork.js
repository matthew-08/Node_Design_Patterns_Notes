const { Readable, Transform } = require('stream');
const { createReadStream, createWriteStream } = require('fs');

const filename = process.argv[2];

const sourceStream = createReadStream(filename);

sourceStream.pipe(createWriteStream('./dest-1.txt'));

const transform = sourceStream.pipe(
  new Transform({
    transform(chunk) {
      this.push('test');
    },
  })
);

transform.pipe(createWriteStream('./dest-2.txt'));
