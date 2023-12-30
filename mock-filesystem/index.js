import { disableMock, enableMock } from './fs-mock.js'
import { readFile } from 'fs'
import { syncBuiltinESMExports } from 'module'


enableMock('hello from mocked fs module')

readFile('./test', (data) => {
    console.log(data)
})
disableMock()