
function concurrentTasks (tasks, finalCallback) {
    let counter = 0
    tasks.forEach((t) => t(() => {
        if (++counter === tasks.length) {
            return finalCallback()
        }
        else {
            console.log(counter)
        }
    }))
}

const tasks = [
    (cb) => {
        setTimeout(() => {
            console.log('callback 1')
            cb()
        }, 2000)
    },
    (cb) => {
        setTimeout(() => {
            console.log('callback 2')
            cb()
        }, 200)
    },
    (cb) => {
        setTimeout(() => {
            console.log('callback 3')
            cb()
        }, 200)
    },
    (cb) => {
        setTimeout(() => {
            console.log('callback 4')
            cb()
        }, 200)
    },
    (cb) => {
        setTimeout(() => {
            console.log('callback 5')
            cb()
        }, 200)
    }
]

concurrentTasks(tasks, () => console.log('all done'))