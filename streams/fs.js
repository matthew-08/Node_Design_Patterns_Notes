const fs = require('fs');

const rs = fs.createReadStream('./source.txt');

rs.on('data', (chunk) => console.log(`Data receieved: ${chunk.toString()}`));
