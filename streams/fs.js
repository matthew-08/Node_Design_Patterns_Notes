const fs = require('fs');

const rs = fs.createReadStream('./source.txt');

rs.pipe(fs.createWriteStream('./dest.txt'));
