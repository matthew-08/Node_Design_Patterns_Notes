type QueueExecutor = (enqueue: (data: any) => void) => void;

class Queue {
  private _waitingDequeues: ((value: unknown) => void)[] = [];
  private _waitingEnqueues: Promise<any>[] = [];

  constructor(executor: QueueExecutor) {
    executor(this._enqueue.bind(this));
  }

  private _enqueue(data: any) {
    if (this._waitingDequeues.length) {
      const resolve = this._waitingDequeues.pop();
      if (resolve) {
        resolve(data);
      }
    } else {
      this._waitingEnqueues.push(Promise.resolve(data));
    }
  }

  dequeue() {
    return new Promise((resolve, reject) => {
      if (!this._waitingEnqueues) {
        this._waitingDequeues.push(resolve);
      } else {
        resolve(this._waitingEnqueues.pop());
      }
    });
  }
}
const ns = [1, 2, 3, 4, 5];

const q = new Queue((enqueue) => {
  ns.forEach((n) => enqueue(n));
  setTimeout(() => {
    enqueue(200);
  }, 1000);
});

const test = async () => {
  while (true) {
    const r = await q.dequeue();
    console.log(r);
  }
};

test();
