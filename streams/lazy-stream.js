const { PassThrough } = require('stream');

function LazyStream() {
  return this;
}

LazyStream.prototype.Readable = function (readableStream) {
  class CustomPassThrough extends PassThrough {
    constructor(options) {
      super(options);
    }

    _read() {
                
    }
  }
};
