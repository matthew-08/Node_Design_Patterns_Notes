const path = require('path');
const fs = require('fs/promises');
const arg = process.argv[2];

const withDirname = (file) => path.join(__dirname, file);

fs.readdir(withDirname(arg))
  .then(
    () => new Error('File already exists'),
    (err) => {
      if (err && err.code === 'ENOENT') {
        return fs.mkdir(path.dirname(withDirname(arg)), { recursive: true });
      } else {
        throw new Error('File already exists');
      }
    }
  )
  .then((r) => {
    console.log(r);
    fs.writeFile(withDirname(arg), 'hello world');
  });
