import fs from 'fs'
import { syncBuiltinESMExports } from 'module'


let originalModule = fs.readFile

const mockedFsCallback = (mockedReturn, cb) => {
    setImmediate(() => {
        cb(mockedReturn)   
    })
}

export const enableMock = (mockedReturn) => {
    fs.readFile = (_, cb) => mockedFsCallback(mockedReturn, cb)
    syncBuiltinESMExports()

}

export const disableMock = () => {
    fs.readFile = originalModule
}
