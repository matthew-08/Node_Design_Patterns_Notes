class TaskQueuePC {
  constructor(concurrency = 2) {
    this.taskQueue = [];
    this.consumerQueue = [];

    for (let i = 0; i < concurrency; i++) {
      this.consumer();
    }
  }

  log(message) {
    console.log(`[TaskQueuePC]: ${message}`);
  }

  getTask(outerResolver) {
    return new Promise((resolve, reject) => {
      if (this.taskQueue.length) {
        const task = this.taskQueue.shift();
        return outerResolver(resolve(task()));
      }
      this.consumerQueue.push((task) => outerResolver(resolve(task)));
    });
  }

  consumer() {
    new Promise((resolve, reject) => {
      this.getTask(resolve);
    })
      .catch((e) => console.error(e))
      .finally(() => {
        this.consumer();
      });
  }

  runTask(task) {
    this.log(
      `Received task, there are currently ${this.consumerQueue.length} idle consumers
          and ${this.taskQueue.length} in queue ahead of this task
        `
    );
    return new Promise((resolve, reject) => {
      const runUserTask = () => {
        this.log('User task being ran');
        const taskPromise = task();
        return taskPromise.then(resolve, reject);
      };

      if (this.consumerQueue.length) {
        const consumer = this.consumerQueue.shift();
        consumer(runUserTask());
      } else {
        this.taskQueue.push(runUserTask);
      }
    });
  }
}

const getMockExecutor = (ms) => (resolve, reject) =>
  setTimeout(() => resolve(), ms);

const getMockTask = (ms) => () => new Promise(getMockExecutor(ms));

const tasks = [
  getMockTask(100),
  getMockTask(400),
  getMockTask(1000),
  getMockTask(1200),
  getMockTask(5000),
  getMockTask(3000),
  getMockTask(200),
  getMockTask(1000),
];

const queue = new TaskQueuePC(2);

tasks.forEach((task) => {
  queue.runTask(task).then((r) => console.log(r));
});
