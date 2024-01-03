const TaskQueue = require('./TaskQueue')


const concatLimit = (coll, limit, iteratee, finalCallback) => {

    const taskQueue = new TaskQueue(limit)

    const results = []
    coll.forEach((element) => {
        taskQueue.addTask((cb) => {
            iteratee(element, (err, data) => {
                if (err) {
                    return finalCallback(err)
                }
                results.push(data)
                if (results.length === coll.length) {
                    return finalCallback(null, results)
                }
                cb()
            })
        })
    })

    taskQueue.processTasks()
}

concatLimit([1, 2, 3, 4, 5, 6, 7, 8], 4, (element, callback) => {
    setTimeout(() => {
        callback(null, element)
    }, 1000)
}, (err, data) => {
    console.log(data)
})