async function testMultipleAwait() {
  try {
    const aPromise = new Promise((resolve) => {
      console.log('starting timeout');
      setTimeout(() => {
        console.log('resolving a');
        resolve('a');
      }, 200);
    });

    const bPromise = new Promise((_, reject) => {
      setTimeout(() => reject(), 100);
    });

    const a = await aPromise;
    const b = await bPromise;
  } catch (e) {
    console.log('Caught error', e);
  }
}

const sleep = () =>
  new Promise((resolve, reject) => setTimeout(() => resolve(), 100000));

process.on('unhandledRejection', async () => {
  await sleep();
});

testMultipleAwait();

setTimeout(() => null, 10000);
