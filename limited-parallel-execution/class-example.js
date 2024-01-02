class TaskQueue {
    #concurrency
    #tasks
    #running
    constructor (concurrency = 2, tasks) {
        this.#concurrency = concurrency
        this.#tasks = tasks || []
        this.#running = 0
    }

    addTask(task) {
        this.#tasks.push(task)
        process.nextTick(this.#next.bind(this))
        return this
    }

    #next() {
        while (this.#running < this.#concurrency && this.#tasks.length) {
            const task = this.#tasks.shift()
            task(() => {
                this.#running--
                process.nextTick(this.#next.bind(this))
            })
            this.#running++
            this.#report()
        }
    }

    #report() {
        console.log(`Running tasks ${this.#running}\n Idle tasks: ${this.#tasks.length}`)
    }

    processTasks() {
        this.#next()
        return this
    }

}

const createAsyncTask = (name, timeout) => {
    return (cb) => {
        console.log(`Executing ${name}`)
        setTimeout(() => {
            cb()     
        }, timeout)
    }
}


const tasks = [
    createAsyncTask('TASK 1', 2000),
    createAsyncTask('TASK 2', 500),
    createAsyncTask('TASK 3', 1000),
    createAsyncTask('TASK 4', 5000),
    createAsyncTask('TASK 5', 1000),
    createAsyncTask('TASK 6', 30),
    createAsyncTask('TASK 7', 1000),
    createAsyncTask('TASK 8', 3000),
    createAsyncTask('TASK 9', 1500),
]


const taskQueue = new TaskQueue(2, tasks)

taskQueue.processTasks()