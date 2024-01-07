const fs = require('fs/promises');
const superagent = require('superagent');
const cheerio = require('cheerio');
const { URL } = require('url');

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
