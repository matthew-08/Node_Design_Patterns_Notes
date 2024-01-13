const { scryptSync, randomBytes } = require('crypto');

const test = (input) => {
  const start = process.hrtime.bigint();

  const a = input === 'VSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS';
  const end = process.hrtime.bigint();

  console.log(start - end);
};

test('VSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS');
