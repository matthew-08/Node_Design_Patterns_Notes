// 1. accepts packet
// 2. checks that packet has enough bytes to process the header
//      1. If not, defer reading the packet until there's enough bytes available
// 3. sets local variable to the length of the packet.
// 4. while the buffer is greater or equal to the length of the packet
//      1. we have a full packet, pull out the packet and process it as a message
//      2. find the delimiter string.
//      3. see if there's enough bytes after the delimiter string to read the header
//          1. if not, defer to next read event
//      4. remove delimiter
//      5. set local variable to data length.
//      6. read from the socket, write to buffer.
//      7. check while loop again

import { Server } from 'net';

const HEADER_SIZE = 4;

const server = new Server((socket) => {
  let dataLength: number = 0;
  let accumulatingBuffer: Buffer = Buffer.alloc(4);
  socket.on('readable', () => {
    if (!dataLength) {
      const headerChunk: Buffer = socket.read(4);
      if (!headerChunk) return;
      dataLength = headerChunk.readUint32BE(0);
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
      handleCompleteMessage(data);

      const nextAccBuffer = Buffer.alloc(
        accumulatingBuffer.length - (HEADER_SIZE + dataLength)
      );

      accumulatingBuffer.copy(nextAccBuffer, 0, HEADER_SIZE + dataLength);
      accumulatingBuffer = nextAccBuffer;

      if (accumulatingBuffer.length > 4) {
        dataLength = accumulatingBuffer.readUint32BE(0);
      }
    }

    if (!accumulatingBuffer.length) {
      dataLength = 0;
      accumulatingBuffer = Buffer.alloc(4);
    }
  });
});

function handleCompleteMessage(result: Buffer) {
  console.log(`User message: ${result.toString()}`);
}

server.listen(3001, () =>
  console.log('Server listening on port localhost:3001')
);
