const superagent = require('superagent');
const cheerio = require('cheerio');
const fs = require('fs/promises');
const path = require('path');

const urlToFilename = (e) => {
  const url = new URL(e.attribs.href || '', 'http://google.com');
  const removePrefix = url.hostname.replace(/www./, '');
  return removePrefix.concat(url.pathname);
};

superagent
  .get('google.com')
  .then((r) => {
    return Array.from(cheerio.load(r.text)('a')).map((e) => urlToFilename(e));
  })
  .then((r) => {
    r.forEach((url) => writeFile(url, 'test'));
  });

const writeFile = (arg, content) => {
  fs.readFile(arg)
    .then(
      () => new Error('File already exists'),
      (err) => {
        if (err && err.code === 'ENOENT') {
          return fs.mkdir(path.dirname(arg), { recursive: true });
        } else {
          throw new Error('File already exists');
        }
      }
    )
    .then((r) => {
      console.log(r);
      fs.writeFile(arg, content);
    });
};
