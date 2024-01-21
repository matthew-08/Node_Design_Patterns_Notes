import { error } from 'console';
import { createReadStream } from 'fs';

createReadStream;
// Difference between flowing and non-flowing streams

let total = 0;
let timesCalled = 0;
const stream = createReadStream('./test.txt', {
  highWaterMark: 8,
}).on('error', (err) => console.error(err));
stream.on('readable', () => {
  const bytesOrNull = stream.read(2);
  console.log(stream.read(2));
  console.log(stream.read(2));
  console.log(stream.read(2));

  ++timesCalled;
  if (bytesOrNull) {
    total += bytesOrNull.length;
  }
});

stream.on('end', () => {
  console.log(
    `TOTAL BYTES READ: ${total}\n READABLE CALLED ${timesCalled} times.`
  );
});
