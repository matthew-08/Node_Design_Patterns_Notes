
const fs = require('fs')

const concat = (collection, iteratee, callback) => {
    let index = 0
    const result = []
    const iterate = () => {
        const item = collection[index]
        iteratee(item, (data) => {
            result.push(data)
            index++
            if (index === collection.length) {
                return callback(null, result)
            }
            iterate()
        })

    }
    iterate()
}


concat([1, 2, 3], (item, cb) => {
    setTimeout(() => {
        cb(item)
    }, 1000)
}, (err, results) => {
    console.log(results)
})