const { EventEmitter } = require('events')
const { readFile } = require('fs')

class FindRegex extends EventEmitter {
    constructor (regex) {
        super()
    }
}