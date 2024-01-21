const { exec } = require('child_process');
const { promisify } = require('util');

const execPromise = promisify(exec);

Promise.all([
  execPromise('ls .'),
  execPromise('ls ../'),
  execPromise('ls ../../'),
  execPromise('ls ../../../'),
]).then((r) => console.log(r));
