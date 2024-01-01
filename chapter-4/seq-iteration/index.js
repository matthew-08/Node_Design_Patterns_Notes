const tasks = [
    (cb) => {
        console.log('Task 1')
        cb()
    },
    (cb) => {
        console.log('Task 2')
        cb()
    },
    (cb) => {
        console.log('Task 3')
        cb()
    }
]

function iterate(index) {
    if (index === tasks.length) {
        return finish()
    }
    const task = tasks[index]
    task(() => iterate(index + 1))
}

function finish() {
    // iteration completed
    console.log('All tasks executed')
}

iterate(0)
console.log('sync task')

