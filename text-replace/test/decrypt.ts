import { createGunzip } from 'zlib';
import pumpify from 'pumpify';
import { createDecipheriv } from 'crypto';
import { pipeline } from 'stream';
import { createReadStream, createWriteStream } from 'fs';
import { scryptSync } from 'crypto';
import { randomBytes } from 'crypto';
const decryptAndDecompress = (key: Buffer, iv: Buffer) => {
  return new pumpify(createDecipheriv('aes192', key, iv), createGunzip());
};

const source = process.argv[2];
const password = process.argv[3];
const iv = process.argv[4];

pipeline(
  createReadStream(source),
  decryptAndDecompress(Buffer.from(password, 'hex'), Buffer.from(iv, 'hex')),
  createWriteStream('./test-dest.txt'),
  (err) => {
    console.log(err);
  }
);
