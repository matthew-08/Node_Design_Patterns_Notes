const buff = Buffer.alloc(4);
buff.writeUInt32BE(2000);
const buff2 = Buffer.alloc(4);
buff2.writeUInt32LE(2000);
console.log(buff, buff2);
