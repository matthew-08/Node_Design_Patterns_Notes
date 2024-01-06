const fs = require('fs');

const separateFilesAndDir = (dirents) => {
  return dirents.reduce(
    (acc, dirent) => {
      if (dirent.isDirectory()) {
        acc.directories.push(dirent.name);
      } else {
        acc.files.push(dirent.name);
      }
      return acc;
    },
    { directories: [], files: [] }
  );
};

function listNestedFiles(dir, fb) {
  const results = [];

  function iterateDir(dir, cb) {
    fs.readdir(dir, { withFileTypes: true }, (err, dirStream) => {
      if (err) return cb(err);
      const { directories, files } = separateFilesAndDir(dirStream);
      results.push(...files);
      if (!directories.length) {
        return cb();
      }
      let dirs = directories.length;
      directories.forEach((nestedDir) =>
        iterateDir(dir + '/' + nestedDir, () => {
          dirs -= 1;
          if (dirs === 0) {
            return cb(results);
          }
        })
      );
    });
  }

  iterateDir(dir, fb);
}

listNestedFiles('./test', (r) => console.log(r, 'results'));
