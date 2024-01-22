const { Server } = require('net');

/* const server = new Server((socket) => {
  const remoteAddr = socket.remoteAddress;
  const addr = socket.address();
  const portAndAddress = remoteAddr + socket.remotePort;

  console.log(
    `REMOTE ADDRESS: ${remoteAddr}\n SOCKET.ADDRESS: ${
      (addr.address, addr.port)
    }`
  );
});

server.listen(3000, () => console.log('Server listening'));
 */

/* const bufferOne = Buffer.alloc(12, 'foo');
const bufferTwo = Buffer.alloc(6, 'bar');

console.log(`Buffer one before ${bufferOne.toString()}`);
console.log(`Buffer two before ${bufferTwo.toString()}`);
bufferTwo.copy(bufferOne);
console.log(`Buffer one after ${bufferOne.toString()}`);
console.log(`Buffer two after ${bufferTwo.toString()}`);
 */
const buf = Buffer.alloc(6);

const bufOne = Buffer.alloc(3, 'a');
const bufTwo = Buffer.alloc(3, 'b');

bufOne.copy(buf);
bufTwo.copy(buf, bufOne.length);
console.log(buf.toString());
