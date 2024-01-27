import { fork } from 'child_process';
import { createReadStream, createWriteStream } from 'fs';
import { Socket, connect } from 'net';
import { stdin } from 'process';
import { Readable, pipeline } from 'stream';

// Fork a child process, run a script that generates stderr and stdout

class StreamMultiplexer {
  private _socket: Socket;
  private _streams: Readable[];
  constructor(socket: Socket, streams: Readable[]) {
    this._socket = socket;
    this._streams = streams;
  }

  private handleData(rs: Readable, channelNumber: number) {
    const buff = this.prepareBuffer(rs, channelNumber);
    if (buff) {
      console.log(`Writing ${buff.length - 5} bytes`);
      this._socket.write(buff);
    }
  }

  private prepareBuffer(rs: Readable, channelNumber: number) {
    const chunk: Buffer = rs.read();
    if (!chunk) return;
    const buff = Buffer.alloc(1 + 4 + chunk.length); // 1 byte channel, 4 byte chunk
    buff.writeUInt8(channelNumber, 0);
    buff.writeUInt32BE(chunk.length, 1);
    chunk.copy(buff, 5);
    return buff;
  }

  sendData() {
    this._streams.forEach((rs, index) => {
      rs.on('readable', () => this.handleData(rs, index));
    });
  }
}

const sock = connect(3000);
const child = fork(process.argv[2], { silent: true });
const multiplexer = new StreamMultiplexer(sock, [child.stdout!, child.stderr!]);
multiplexer.sendData();

// packet = [1 byte stream channel][1 byte of content size][stream]
