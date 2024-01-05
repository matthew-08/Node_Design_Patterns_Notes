const fs = require("fs")



const taskOne = (cb) => {
    setTimeout(() => {
        const fileName = './test.txt'
        cb(fileName)
    }, 500)
}

const taskTwo = (cb) => {
    setTimeout(() => {
        cb()
    }, 2000)
}


const doAsyncStuff = (finalCallback) => {
    taskOne((fileName) => {
        fs.readFile(fileName, (err, data) => {
            if (err) {
                return finalCallback(err)
            }
            taskTwo(() => {
                finalCallback(data.toString())
            }) 
        })
    })    
}

doAsyncStuff((r) => console.log(r))