const MODIFIER_NAMES = ['swap', 'write', 'fill'];

class ImmutableBuffer {
  constructor(size, executor) {
    const buff = Buffer.alloc(size);
    const modifiers = {};
    for (const key in buff) {
      if (typeof buff[key] !== 'function') {
        continue;
      }

      if (MODIFIER_NAMES.some((m) => key.startsWith(m))) {
        modifiers[key] = buff[key].bind(buff);
      } else {
        this[key] = buff[key].bind(buff);
      }
    }

    executor(modifiers);
  }
}

const t = new ImmutableBuffer(20, (modifiers) => {
  modifiers.write('hello');
});

console.log(t.write());
