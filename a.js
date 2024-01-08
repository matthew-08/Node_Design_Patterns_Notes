class TaskQueueEx {
  constructor(concurrency = 2) {
    this.concurrency = concurrency;
    this.tasks = [];
    this.consumers = [];

    for (let i = 0; i < concurrency; i++) {
      this.consumer();
    }
  }

  getNextTask() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        console.log('resolving task, will return to consumer');
        resolve();
      }, 2000);
    });
  }

  async consumer() {
    console.log('executing consumer');
    while (true) {
      console.log('awaiting getNextTask()');
      await this.getNextTask();
    }
  }
}

const test = new TaskQueueEx();

setTimeout(() => {}, 40000);
