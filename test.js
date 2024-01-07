class TestPromise {
  constructor(then) {
    this.then = then;
  }

  map(mapper) {
    return new TestPromise((resolve, reject) =>
      this.then((x) => resolve(mapper(x)), reject)
    );
  }
}

const promise = new TestPromise((resolve, reject) => {
  setTimeout(() => resolve(10), 1000);
});

promise
  .map((e) => e + 1)
  .map((v) => v + 2)
  .map((w) => w + 2)
  .then((r) => console.log(r));

setTimeout(() => null, 100);
