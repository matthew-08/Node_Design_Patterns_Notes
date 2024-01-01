class TaskIterator {
    #callbacks = []
    constructor (tasks) {
        this.tasks = tasks
    }

    addTask(task) {
        this.tasks.push(task)
        return this
    }

    #iterateTasks (index) {
        if (index === this.tasks.length) {
            return this.#callbacks.forEach((cb) => cb())
        }
        else {
            const task = this.tasks[index]
            task(() => this.#iterateTasks(index + 1))
        }
    }

    registerCallback (callback) {
        this.#callbacks.push(callback)
        return this
    }

    doTasks() {
        this.#iterateTasks(0)
    }

}


const tasks = [
    (cb) => setTimeout(() => {
        console.log('Done with task 1')
        cb()
    }, 2000),
    (cb) => setTimeout(() => {
        console.log('Done with task 2')
        cb()
    }, 2000),
    (cb) => setTimeout(() => {
        console.log('Done with task 3')
        cb()
    }, 2000),
]

const taskIterator = new TaskIterator(tasks)

taskIterator
    .registerCallback(() => console.log('Done with all tasks'))
    .registerCallback(() => console.log('second callback'))
    .doTasks()