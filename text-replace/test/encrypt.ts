import { createCipheriv, randomBytes, scryptSync } from 'crypto';
import { createReadStream, createWriteStream } from 'fs';
import pumpify from 'pumpify';
import { createGzip } from 'zlib';
import { scrypt } from 'crypto';
import { pipeline } from 'stream';
import { error } from 'console';

const createKeyFromPassword = (password: string) => {
  const salt = randomBytes(16);
  const pass = scryptSync(password, salt, 24);
  console.log(`[KEY]: ${pass.toString('hex')}`);
  return pass;
};

const compressAndEncrypt = (src: string, key: Buffer, iv: Buffer) => {
  const stream = new pumpify(
    createReadStream(src),
    createGzip(),
    createCipheriv('aes192', key, iv)
  );

  return stream;
};

const iv = randomBytes(16);
const dest = `${process.argv[2]}.gz.enc`;
const password = process.argv[3];

pipeline(
  compressAndEncrypt(process.argv[2], createKeyFromPassword(password), iv),
  createWriteStream(dest),
  (err) => {
    if (err) console.error(err);

    console.log(`Compressed and encrypted with with IV: ${iv.toString('hex')}`);
  }
);
