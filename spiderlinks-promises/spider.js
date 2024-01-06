const fs = require('fs/promises');
const superagent = require('superagent');
const cheerio = require('cheerio');
const { URL } = require('url');

const filePathFromUrl = (url) => {
  const urlObj = new URL(url);
  urlObj.pathname;
};

const fileExists = (dirPath) => {
  return fs.opendir(dirPath).then(
    () => true,
    (err) => Promise.resolve(err && err.code === 'ENOENT')
  );
};

const linkFromElement = (element, baseURL) => {
  const url = new URL(element.href || '', baseURL);

  if (url.hostname === baseURL.hostname) {
    return null;
  }

  return url.toString();
};

const getLinks = (html, baseURL) => {
  const links = Array.from(cheerio.load(html)('a'))
    .map((element) => linkFromElement(element.attribs, baseURL))
    .filter(Boolean);

  return links[0];
};

const makeFile = (dir, content) => {
  console.log(dir, content);
  fs.writeFile('test.txt', content);
};

const downloadFile = (url) => {
  console.log(url);
};
const spider = (url, nesting) => {
  const urlObj = new URL(url);
  let nestingLevel = nesting;
  fileExists(urlObj.pathname)
    .then((result) => {
      if (!result) {
        throw new Error('Link has already been fetched');
      }
      return superagent.get(urlObj);
    })
    .then((r) => makeFile(urlObj.pathname, r.text))
    .then((r) => getLinks(r.text, urlObj))
    .catch((e) => console.error(e));
};

module.exports = spider;
