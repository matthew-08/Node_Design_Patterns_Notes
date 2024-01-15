const { Readable } = require('stream');
const Chance = require('chance');

const chance = new Chance();

class RandomStream extends Readable {
  constructor(options) {
    super(options);
    this.emittedBytes = 0;
  }

  _read(size) {
    const chunk = chance.address({ length: size });
    this.push(chunk, 'utf-8');
    this.emittedBytes += chunk.length;
    if (chance.bool({ likelihood: 5 })) {
      this.push(null);
    }
  }
}

const randomStream = new RandomStream();

randomStream
  .on('data', (chunk) => {
    console.log(`a chunk was received ${chunk.toString()}`);
  })
  .on('end', () => {
    console.log(`produced ${randomStream.emittedBytes} amount of bytes`);
  });
