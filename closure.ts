const closure = () => {
  let state = 0;

  const setState = (val: number) => {
    state = val;
  };

  return [state, setState] as const;
};

const [state, setState] = closure();

console.log(`State before: ${state}`);
setState(1);
console.log(`State after: ${state}`);
