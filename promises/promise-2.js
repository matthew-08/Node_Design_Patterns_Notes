const util = require('util');

const testPromise = Promise.resolve(2);

testPromise.then((r) => console.log(r));

console.log('sync code');

setTimeout(() => {
  testPromise.then((r) => console.log(r));
}, 1000);
