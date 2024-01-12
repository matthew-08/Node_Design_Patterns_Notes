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

promise.map((e) => e + 2).then((r) => console.log(r));

setTimeout(() => null, 100);

// 1. then on the first TestPromise ( #1 ) is assigned the value of:
// (resolve, reject) => setTimeout(() => resolve(10), 1000)
// 2. map is invoked on TestPromse ( #1 ).  Map returns another TestPromise ( #2 ).
// The then on this new TestPromise is equal to:
// ((resolve, reject) => (resolve = (x) => resolve(mapper(x)), reject) => setTimeout(() => resolve(10), 1000))
// .then is called on this new promise.  This invokes the then on TestPromise( #2 )
