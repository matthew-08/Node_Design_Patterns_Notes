const { EventEmitter } = require('events')
const { readFile } = require('fs')

class FindRegex extends EventEmitter {
    constructor (regex) {
        super()
        this.regex = regex
        this.files = []
    }

    addFile (file) {
        this.files.push(file)
        return this
    }

    find () {
        process.nextTick(() => this.emit('read-start', this.files))
        for (const file of this.files) {
            readFile(file, 'utf-8', (err, content) => {
                if (err) {
                    return this.emit('err', err)
                }
                this.emit('fileread', file)

                const match = content.match(this.regex)
                if (match) {
                    match.forEach(e => this.emit('found', file, e))
                }
            })
        }
        return this
    }
}


const findRegexInstance = new FindRegex(/hello/)

findRegexInstance
    .addFile('./files/file-1.txt')
    .addFile('./files/file-2.txt')
    .find()
    .on('read-start', (files) => console.log(`Reading files ${files}`))
    .on('found', (file, match) => console.log(`Matched: ${match} in file: ${file}`))
    .on('error', err => console.error`Error emitted ${err.message}`)
    .on('fileread', (file) => console.log(`Reading file ${file}`))