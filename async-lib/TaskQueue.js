class TaskQueue {
    constructor (concurrencyLimit = 2, tasks) {
        this.concurrencyLimit = concurrencyLimit
        this.tasks = tasks ?? []
        this.running = 0
    }
 
    addTask(task) {
        this.tasks.push(task)
        return this
    }
    next() {
        while (this.running < this.concurrencyLimit && this.tasks.length) {
            const task = this.tasks.shift()
            this.running++
            task(() => {
                this.running -= 1
                process.nextTick(this.next.bind(this))
            })
        }
    }    
    processTasks() {
        this.next()
    }
}

module.exports = TaskQueue