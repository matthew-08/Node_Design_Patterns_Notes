import { Socket } from 'dgram';
import { createConnection } from 'net';

const sock = createConnection(
  {
    port: 3000,
  },
  () => {}
);
console.log(sock);
