function iterateSeries(collection, iteratorCallback, finalCallback) {
  let index = 0;
  const internal = () => {
    if (index === collection.length) {
      return finalCallback();
    }
    const item = collection[index];
    iteratorCallback(item, () => {
      index++;
      internal();
    });
  };
  internal();
}

const callback = (item, cb) => {
  console.log(`This is item: ${item}`);
  setTimeout(() => {
    cb();
  }, 2000);
};

iterateSeries([1, 2, 3, 5], callback, () => console.log('final callback'));

console.log('sync action');
