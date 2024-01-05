const fs = require('fs')


const results = []

const createNestedDirectory = (dir, nestedDir) => dir + '/' + nestedDir 

const searchDirectory = (dir, searchTerm, cb) => {

    const traversedFiles = []
    let directoryCount = 0

    fs.readdir(dir, { withFileTypes: true }, (err, dirents) => {
        dirents.forEach((dirent, index) => {
            if (dirent.isDirectory()) {
                directoryCount += 1
                searchDirectory(
                    createNestedDirectory(dir, dirent.name), 
                    searchTerm, 
                    (results) => {
                        console.log('test')
                        directoryCount -= 1
                        traversedFiles.push(...results)
                        cb(traversedFiles)
                })
            }
            else {
                traversedFiles.push(dirent.name)
                if (index === dirents.length - 1 && directoryCount === 0) {
                    cb(traversedFiles)
                }
            }
        })
    })

}

searchDirectory('./test-dir', 'batman', (r) => console.log(r))