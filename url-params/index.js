const slug = require('slug');
const path = require('path');

function urlToFilename(url) {
  const parsedUrl = new URL(url);
  console.log(parsedUrl.pathname);
  const urlPath = parsedUrl.pathname
    .split('/')
    .filter(function (component) {
      return component !== '';
    })
    .map(function (component) {
      return slug(component, { remove: null });
    })
    .join('/');
  let filename = path.join(parsedUrl.hostname, urlPath);
  if (!path.extname(filename).match(/htm/)) {
    filename += '.html';
  }
  return filename;
}

urlToFilename(
  'https://medium.com/swlh/urlsearchparams-in-javascript-df524f705317'
);
