const setTimeoutPromise = async () => setTimeout(() => 200, 200);

const test = async () => {
  const a = await setTimeoutPromise();
  console.log(a);
};

test();
