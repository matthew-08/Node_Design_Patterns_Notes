const { Readable } = require('stream');

class TransformToLine extends Readable {
  constructor(options) {
    super(options);
    this.internalBuff = '';
  }

  _read(chunk, enc) {
    while (this.internalBuff.indexOf('\n') === -1) {
      this.internalBuff += chunk;
    }

    this.push(this.internalBuff);
    this.internalBuff = '';
  }
}
