const { readFile, writeFile, appendFile } = require("fs")


function writeToFile (data, dest, cb) {
    appendFile(dest, data.toString('utf8') + '\n', (err) => {
        if (err) {
            cb(err)
        }
        cb()
    })
}

function concatFiles (files, dest, callback) {
    if (files.length === 0) {
        return callback()
    }
    const file = files.shift()
    readFile(file, 'utf-8', (err, data) => {
        if (err) {
            return callback(err)
        }
        writeToFile(data, dest, () => {
            concatFiles(files, dest, callback)
        })
    })

}

const files = ['./file-1.txt', './file-2.txt']

concatFiles(files, './dest.txt', () => {
    console.log('done')
})