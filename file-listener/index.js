const fs = require('node:fs')
const path = require('path')

const fileReader = (filePath) => {
    const listeners = []

    fs.readFile(path.join(__dirname, filePath), 'utf8', (err, data) => {
        listeners.forEach((listener) => listener(data))
    })

    return {
        registerListen: (listener) => listeners.push(listener) 
    }
}

const test = fileReader('./test.txt')
test.registerListen((data) => console.log(`LISTENER 1: ${data}`))
test.registerListen((data) => console.log(`LISTENER 2: ${data}`))
test.registerListen((data) => console.log(`LISTENER 3: ${data}`))
