const async = (shouldResolve) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        console.log('resolving');
        resolve();
      }
      reject();
    }, 200);
  });
};

const test = async () => {
  try {
    const p1 = async();
    const p2 = async();

    await p1;
    await p2;
  } catch (error) {
    console.log('caught exception');
  } finally {
    console.log('finally');
  }
};

// Why this can cause an unhandledRejection:

// In this example, the two async functions are invoked sychronously
// because both of them return Promises but do not await them.

// By the time we get to 'await p1', both promises are already being processed
// Now, image p1 throws an error or rejects.  This will cause the try...catch
// block to immediatley exit and this function context and implicit
// wrapper promise provided by async will be resolved.

// Since we never made it to p2, or put in a callback to catch p2, the promise
// is pretty much in limbo.  When it rejects, there is no longer any execution context
// containing a try...catch block for it to be caught with - it will
// propogate up and trigger an unhandled rejection.

const unsafeAsync = async () => {
  try {
    const p1 = await async();
    const p2 = await async();

    await p1;
    await p2;
  } catch (error) {
    console.log('caught exception');
  } finally {
    console.log('finally');
  }
};

unsafeAsync();
