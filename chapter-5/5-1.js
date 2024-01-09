// Promise.all implementation using only promises

const promiseAll = (promises) => {
  return new Promise((resolve, reject) => {
    const results = [];
    let finishedPromiseCount = 0;
    for (const promise of promises) {
      promise
        .then((value) => {
          results.push(value);
          finishedPromiseCount += 1;
          if (finishedPromiseCount === promises.length) {
            resolve(results);
          }
        })
        .catch((err) => reject(err));
    }
  });
};

const promises = [
  new Promise((resolve, reject) => setTimeout(() => resolve('this'), 500)),
  new Promise((resolve, reject) => setTimeout(() => resolve('is'), 1500)),
  new Promise((resolve, reject) => setTimeout(() => resolve('multiple'), 5000)),
  new Promise((resolve, reject) => setTimeout(() => resolve('promises'), 300)),
  new Promise((resolve, reject) => setTimeout(() => resolve('wow'), 400)),
  /*   new Promise((resolve, reject) => setTimeout(() => reject('rejection'), 1500)),
   */
];

promiseAll(promises)
  .then((r) => console.log(r))
  .catch((e) => console.error(e));
