// parallel async map, supports concurrency limit
// args:
//  iterable,
//  callback (can return either a promise OR a value),
//  concurrency

const asyncMap = async (collection, callback, concurrency = 2) => {
  const userCollection = collection;
  const concurrencyLimit = concurrency;
  const results = [];
  return new Promise((outerResolve, outerReject) => {
    let unfinishedPromises = 0;
    const doTask = () => {
      console.log('doing task', unfinishedPromises);
      unfinishedPromises += 1;
      return new Promise(async (resolve, reject) => {
        results.push(await callback(userCollection.shift()));
        unfinishedPromises -= 1;
        if (userCollection.length) {
          doTask();
        }
        if (unfinishedPromises) {
          resolve();
        } else {
          outerResolve(results);
        }
      });
    };
    for (let i = 0; i < concurrencyLimit; i++) {
      doTask();
    }
  });
};

asyncMap(
  [1, 2, 3, 4, 5, 6, 7, 8],
  (e) =>
    new Promise((resolve, reject) => setTimeout(() => resolve(e + 2), 1000)),
  4
).then((r) => console.log(r, 'e'));
