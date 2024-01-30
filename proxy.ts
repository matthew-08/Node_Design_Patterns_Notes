const obj = {
  foo: 'bar',
  bar: 'foo',
};

const proxy = new Proxy(obj, {
  get: (target, property: string) => {
    if (typeof property === 'string') {
      return '---- ' + property + ' ----';
    }
    return target[property];
  },
});

console.log(proxy.bar);
