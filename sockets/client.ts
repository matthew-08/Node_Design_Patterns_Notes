import { Socket } from 'dgram';
import { createConnection } from 'net';

const getBuffer = (message: string) => {
  const buff = Buffer.alloc(4 + message.length);
  buff.writeUint32BE(message.length);
  buff.write(message, 4);
  return buff;
};

const sock = createConnection(
  {
    port: 3001,
  },
  () => {
    const buffs = [
      'message one this is a long message wow amazing',
      'this is another long message also amazing very cool coo',
      'oh wow another',
      'short message',
      'abc',
      'd',
      'amazinng wow',
      'absolutely astonishing',
      'a',
      '123',
      'messages',
      'should be distinct',
      'am,amamamamefgimeifdgamediogbneaidug anedigunea diugnae diugnae dgiuane diugknae duiganke kdugianedui gnaedg uiaendg kiuaedngkieau dngaeikudg naekdiugn',
    ].map(getBuffer);

    buffs.forEach((b) => console.log(b.length));

    buffs.forEach((buff) => sock.write(buff));
  }
);
