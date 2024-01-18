const fs = require('fs');
const { Transform } = require('stream');
const rs = fs.createReadStream('./source.txt');
const { createServer } = require('http');

class TransformString extends Transform {
  constructor(options, searchStr, replaceStr) {
    super(options);
    this.tail = '';
    this.searchStr = searchStr;
    this.replaceStr = replaceStr;
    this.pieces = [];
  }

  _transform(chunk, encoding, callback) {
    this.pieces = (this.tail + chunk).split(this.searchStr);
    const tailLength = this.searchStr.length;
    this.tail = this.pieces[this.pieces.length - 1].slice(-tailLength);

    this.pieces[this.pieces.length - 1] = this.pieces[
      thispieces.length - 1
    ].slice(0, -tailLength);
    this.push(this.pieces.join(this.replaceStr));
    callback();
  }

  _flush(callback) {
    this.push(this.tail);
    callback();
  }
}

rs.pipe(new TransformString({}, 'world', 'node.js')).pipe(
  fs.createWriteStream('./dest.txt')
);


const server = createServer((req, res ) => {
    console.log(req)
})

server.listen(8000, () => console.log('running'))