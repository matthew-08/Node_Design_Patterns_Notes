const { readdir } = require("fs")


const topLevel = []
const getDirectoryContents = (dir, cb) => {
    const directories = []
    const files = []
    readdir(dir, { recursive: true, withFileTypes: true, encoding: 'utf-8' }, (err, data) => {
        if (err) {
            return cb(err)
        }
        data.forEach(dirent => {
            if (dirent.isDirectory()) {
                directories.push(dir + '/' + dirent.name)
            }
            else {
                files.push(dirent.name)
            }
        })
        cb([{ directories, files }])
    })

}


const crawl = (fileConents, cb) => {  
    if (!fileConents[0].directories.length) {
        cb(fileConents)
    }
    
    let completed = 0

    const results = []
    fileConents[0].directories.forEach(dir => listNestedFiles(dir, (data) => {
        completed++
        if (completed === fileConents[0].directories.length) {
            cb(data)
        }
    }))
}


const listNestedFiles = (dir, cb) => {
    getDirectoryContents(dir, (data) => {
        crawl(data, (newData) => {
            cb(newData.concat(data))
        })
    })
}

listNestedFiles('./test', (d) => console.log(d))



// 1st call listNestedFile (./test, (d) => consolke.log(d))
    // 2nd call listNestedFile(./dir-2, (data) => completed ++, if (completed===...)