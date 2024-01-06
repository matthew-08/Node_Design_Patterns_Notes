const fs = require('fs')


const promiseRead = (dir) => {
    return new Promise((resolve, reject) => {
        fs.readFile(dir, (err, data) => {
            if (err) {
                return reject(err)
            }
            resolve(data)
        })
    })
}


let file = null

promiseRead('./test.txt')
    .then((v) => {
        file = v
        console.log(file.toString())
    })