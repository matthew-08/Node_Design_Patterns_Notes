const superagent = require('superagent');
const fs = require('fs/promises');
const path = require('path');

crawl(process.argv[2]);

function createFile(url, content) {
  const fileNameFromUrl = getFilePathFromUrl(url);
  const dirName = path.dirname(fileNameFromUrl);
  if (dirName === '.') {
    return fs.writeFile(fileNameFromUrl + '.html', content);
  }
  return fs
    .mkdir(path.dirname(fileNameFromUrl), { recursive: true })
    .then((r) => {
      fs.writeFile(fileNameFromUrl, content);
    });
}

function downloadFile(url) {
  superagent.get(url).then((r) => {
    createFile(url, r.text);
  });
}

function crawl(url) {
  downloadFile(url);
}

function getFilePathFromUrl(url) {
  const currentURL = new URL(url);
  return currentURL.hostname
    .replace(/www./, '')
    .concat(currentURL.pathname === '/' ? '' : currentURL.pathname);
}
