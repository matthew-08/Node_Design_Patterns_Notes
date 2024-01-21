import { Server, Socket } from 'net';

const server = new Server((socket) => {});

class Sock {
  socket: Socket;
  constructor(socket: Socket) {
    this.socket = socket;
    this.socket.on('readable', this.handleReadable.bind(this));
  }
  handleReadable() {
    console.log((this.socket as any)._handle.fd);
    console.log(this.socket.read().toString());
  }
}

server.on('connection', (socket) => {
  socket.on('readable', () => {
    console.log((socket as any)._handle.fd);
    console.log(socket.read().toString());
    socket.write('pong pong wow poopy');
    socket.destroy();
  });
});

server.listen(8000, '0.0.0.0', () => console.log('listening on 0.0.0.0:8000'));
