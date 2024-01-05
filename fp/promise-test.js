function fetchData(callback) {
    // Simulating an asynchronous operation
    setTimeout(() => {
        const data = "Async data";
        callback(data);
    }, 1000);
}

// Usage
fetchData((result) => {
    console.log(result);
});


function fetchDataTwo() {
    return new Promise((resolve) => {
        // Simulating an asynchronous operation
        setTimeout(() => {
            const data = "Async data";
            resolve(data);
        }, 1000);
    });
}

// Usage
fetchDataTwo()
    .then((result) => {
        console.log(result)
    })



class MockPromise {
    constructor(task) {
        this.task = task
        this.thens = []
    }
    then(callback) {
        this.thens.push(callback)
        return this
    }
    execute() {
        this.task((data) => {
            this.thens.forEach(t => t(data))
        })
    }
}

const doAsyncTasks = (tasks) => {
    tasks.forEach(task => {
        new MockPromise(task)
            .then((e) => console.log(`callback 1 ${e}`))
            .then((e) => console.log(`callback 2 ${e}`))
            .then((e) => console.log(`callback 3 ${e}`))
            .execute()
    })
}

const tasks = [
    (cb) => {
        setTimeout(() => {
            cb('hello')
        }, 3000)
    },
    (cb) => {
        setTimeout(() => {
            cb('hello')
        }, 1000)
    },
]

doAsyncTasks(tasks)