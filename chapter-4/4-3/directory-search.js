const fs = require('fs')


class DirectorySearcher {
    constructor(stringToMatch, directories, callback) {
        this.directories = directories
        this.stringToMatch = stringToMatch
        this.results = []
        this.callback = callback
    }

    addDirectory(directory) {
        this.directories.push(directory)
    }
    searchFile(file) {
        this.processingFiles = true
        fs.readFile(file, 'utf-8', (err, data) => {
            if (data && data.includes(this.stringToMatch)) {
                this.results.push(file)
            }
            this.processingFiles = false
            this.checkDone()
        }) 
    }
    searchDirectories() {
        while (this.directories.length) {
            const directory = this.directories.shift()
            fs.readdir(directory, { withFileTypes: true }, (err, files) => {
                files.forEach((file) => {
                    if (file.isDirectory()) {
                        this.directories.push(directory + '/' + file.name)
                        process.nextTick(this.searchDirectories.bind(this))
                    }
                    this.searchFile.bind(this, directory + '/' + file.name)()
                })
                process.nextTick(this.checkDone.bind(this))
            })
        }
    }
    checkDone() {
        if (!this.directories.length && !this.processingFiles) {
            this.callback(this.results)
        }
    }

}

const dirSearcher = new DirectorySearcher('batman', ['./test-dir'], (r) => {
    console.log(r)
})

dirSearcher.searchDirectories()