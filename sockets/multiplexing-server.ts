import { createWriteStream } from 'fs';
import { Server } from 'net';

const stdoutStream = createWriteStream('stdout.txt');
const stderrStream = createWriteStream('stderr.txt');

const channels = [stdoutStream, stderrStream];
const HEADER_SIZE = 5;
const server = new Server((socket) => {
  let dataLength: number = 0;
  let channel = 0;
  let accumulatingBuffer: Buffer = Buffer.alloc(5);
  socket
    .on('readable', () => {
      if (!dataLength) {
        const headerChunk: Buffer = socket.read(5);
        if (!headerChunk) return;
        dataLength = headerChunk.readUint32BE(1);
        channel = headerChunk.readUint8(0);
        headerChunk.copy(accumulatingBuffer);
      }

      const chunk = socket.read();
      if (!chunk) return;

      let tempBuffer = Buffer.alloc(chunk.length + accumulatingBuffer.length);

      accumulatingBuffer.copy(tempBuffer);
      chunk.copy(tempBuffer, accumulatingBuffer.length);

      accumulatingBuffer = tempBuffer;
      while (accumulatingBuffer.length - HEADER_SIZE >= dataLength) {
        // pull out data from packet
        const data = Buffer.alloc(dataLength);
        accumulatingBuffer.copy(data, 0, HEADER_SIZE, dataLength + HEADER_SIZE);

        console.log(
          `Writing ${data.length} bytes of data to channel ${channel}`
        );
        channels[channel].write(data, 'utf-8');

        const nextAccBuffer = Buffer.alloc(
          accumulatingBuffer.length - (HEADER_SIZE + dataLength)
        );
        accumulatingBuffer.copy(nextAccBuffer, 0, HEADER_SIZE + dataLength);
        accumulatingBuffer = nextAccBuffer;

        if (accumulatingBuffer.length >= 5) {
          dataLength = accumulatingBuffer.readUint32BE(1);
          channel = accumulatingBuffer.readUInt8(0);
        }
      }
      if (!accumulatingBuffer.length) {
        dataLength = 0;
        channel = 0;
        accumulatingBuffer = Buffer.alloc(5);
      }
    })
    .on('end', () => {});
});

server.listen(3000, () => console.log('listening on localhost:3000'));
