class TaskQueue {
  constructor(concurrency = 2) {
    this.tasks = [];
    this.concurrency = concurrency;
    this.running = 0;
  }

  async next() {
    while (this.tasks.length && this.running < this.concurrency) {
      this.running++;
      await this.tasks.shift()();
      this.running--;
      this.next();
    }
  }

  addTask(task) {
    return new Promise((resolve, reject) => {
      const userTask = () => {
        return task().then(resolve, reject);
      };

      this.tasks.push(userTask);
      this.next();
    });
  }
}

const testTasks = [
  () => new Promise((resolve, reject) => setTimeout(() => resolve(2), 1000)),
  () => new Promise((resolve, reject) => setTimeout(() => resolve(2), 1000)),
  () => new Promise((resolve, reject) => setTimeout(() => resolve(2), 1000)),
  () => new Promise((resolve, reject) => setTimeout(() => resolve(2), 1000)),
  () => new Promise((resolve, reject) => setTimeout(() => resolve(2), 1000)),
  () => new Promise((resolve, reject) => setTimeout(() => resolve(4), 1000)),
  () => new Promise((resolve, reject) => setTimeout(() => resolve(4), 1000)),
  () => new Promise((resolve, reject) => setTimeout(() => resolve(4), 1000)),
];

const tq = new TaskQueue(7);

testTasks.forEach((task) => tq.addTask(task).then((r) => console.log(r)));

setTimeout(() => null, 10000);
