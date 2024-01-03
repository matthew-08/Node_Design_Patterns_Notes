
const { concat: realConcat } = require('async')
const fs = require('fs')

const concat = (collection, iteratee, callback) => {
    const result = []
    
    collection.forEach((item) => {
        iteratee(item, (err, data) => {
            if (err) {
                return callback(err)
            }
            result.push(...data)
            if (result.length === collection.length) {
                return callback(null, result)
            }
        })
    })

}


concat(['./dir-1', './dir-2', './dir-3'], fs.readdir, (err, results) => {
    if (err) console.error(err)
    console.log(results)
})

console.log('some sync stuff')