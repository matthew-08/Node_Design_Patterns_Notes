import { createReadStream } from 'fs';

const src = createReadStream('./dest.txt', {
  highWaterMark: 2,
});

src.on('readable', () => {
  console.log(JSON.stringify((src as any).readableBuffer));
  const test = src.read(4);
  console.log(test);
});
