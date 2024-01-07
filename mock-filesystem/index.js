import { disableMock, enableMock } from './fs-mock.js';
import { readFile } from 'fs';
import { syncBuiltinESMExports } from 'module';

syncBuiltinESMExports();
enableMock('hello from mocked fs module');

console.log(readFile('./test'));

disableMock();
