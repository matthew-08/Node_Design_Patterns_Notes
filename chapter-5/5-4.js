// parallel async map, supports concurrency limit
// args:
//  iterable,
//  callback (can return either a promise OR a value),
//  concurrency

const asyncMap = async (collection, callback, concurrency = 2) => {
  let running = 0;
  const results = [];
  return new Promise((outerResolve, outerReject) => {
    const doTask = () => {
      running += 1;
      return new Promise(async (resolve, reject) => {
        const result = await callback(collection.shift());
        results.push(result);
        running -= 1;
        if (collection.length) {
          doTask();
        }
        if (!running) {
          outerResolve(results);
        }
        resolve();
      });
    };
    for (
      let i = 0;
      i < (concurrency > collection.length ? collection.length : concurrency);
      i++
    ) {
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
