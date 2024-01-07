class NaivePromise {
  constructor(exectuor) {
    this._executor = exectuor;
  }

  then(onFulfilled, onReject) {
    return new NaivePromise((resolve, reject) => {
      this._executor((x) => resolve(onFulfilled(x)));
    });
  }
  go() {
    this._executor();
  }
}

const prom = new NaivePromise((resolve, reject) => {
  setTimeout(() => {
    resolve(2);
  }, 100);
});

prom.then((r) => console.log(r)).go();
