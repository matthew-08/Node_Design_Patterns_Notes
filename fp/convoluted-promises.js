const fs = require("fs/promises")



const taskOne = () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            const fileName = './test.txt'
            resolve(fileName)
        }, 500)
    })
}

const taskTwo = () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve()
        }, 500)
    })
}


const doAsyncStuff = (finalCallback) => {
    let rs = null
    taskOne()
        .then((result) => {
            return fs.readFile(result)
        })
        .then(result => {
            rs = result
            return taskTwo()
        })
        .then(() => finalCallback(rs))
}

doAsyncStuff((r) => console.log(r))