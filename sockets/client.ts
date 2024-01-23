import { createConnection } from 'net';

const sock = createConnection(
  {
    port: 3000,
  },
  () => {
    const message = 'hello wow amazing';
    const buff = Buffer.alloc(4);
    buff.writeUInt32BE(message.length, 0);
    console.log(buff);
    sock.write(buff);
  }
);
