const fs = require('fs')

const cache = new Map()

const fileReader = (filePath) => {
    const listeners = []

    if (cache.has(filePath)) {
        return cache.get(filePath)
    }
    else {
        fs.readFile(filePath, (err, data) => {
            if (err) {
                throw new Error(err)
            }
            listeners.forEach((listener) => listener(data))
            cache.set(filePath, data)
        })
    }

    return {
        onDataReady: (listener) => listeners.push(listener)
    }
}

const reader = fileReader('./test.txt')

reader.onDataReady((data) => console.log(`Data in first ${data}`))
reader.onDataReady((data) => console.log(`Data in second ${data}`))

const reader2 = fileReader('./test.txt')

reader2.onDataReady((data) => console.log(`Data in reader 2 first: ${data}`))
reader2.onDataReady((data) => console.log(`Data in reader 2 second: ${data}`))
reader2.onDataReady((data) => console.log(`Data in reader 2 third: ${data}`))
reader2.onDataReady((data) => console.log(`Data in reader 2 fourth: ${data}`))
reader2.onDataReady((data) => console.log(`Data in reader 2 fifth: ${data}`))
