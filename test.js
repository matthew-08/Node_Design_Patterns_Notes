const fs = require('fs');

const promisify = (oldApi) => {
  return (...args) => {
    return new Promise((resolve, reject) => {
      oldApi(...args, (err, data) => {
        if (err) reject(err);
        resolve(data.toString());
      });
    });
  };
};

const readFilePromise = promisify(fs.readFile);

readFilePromise('.gitignore').then((r) => console.log(r));
