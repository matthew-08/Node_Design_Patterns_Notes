class TaskQueue {
  constructor(concurrency = 2) {
    this.tasks = [];
    this.concurrency = concurrency;
    this.running = 0;
  }

  next() {
    while (this.running < this.concurrency && this.tasks.length) {
      const task = this.tasks.shift();
      this.running++;
      task().finally(() => {
        this.running--;
        this.next();
      });
    }
  }

  addTask(task) {
    // user passes in a callback which returns a promise
    return new Promise((resolve, reject) => {
      // we return a promise to this user
      // in the executor func body, synchronously push a func to the task queue
      // this func, when executed, will begin executing the users tasks
      this.tasks.push(() => task().then(resolve, reject)); // catch the result of the users tasks with .then and resolve our wrapper promise

      process.nextTick(() => this.next());
    });
  }
}

const queue = new TaskQueue();

const tasks = [
  () =>
    new Promise((resolve, reject) =>
      setTimeout(() => {
        console.log('resolving task 1');
        resolve(2);
      }, 1000)
    ),
  () =>
    new Promise((resolve, reject) =>
      setTimeout(() => {
        console.log('resolving task 1');
        resolve(2);
      }, 1000)
    ),
  () =>
    new Promise((resolve, reject) =>
      setTimeout(() => {
        console.log('resolving task 1');
        resolve(2);
      }, 1000)
    ),
];

tasks.forEach((task) => queue.addTask(task).then((r) => console.log(r)));
