import { Server } from 'net';

type QueueExecutor = (enqueue: (data: any) => void) => void;

class Queue {
  private _queue: Promise<any>[] = [];
  private _awaitingDequeue: ((val: unknown) => void) | undefined;
  constructor(executor: QueueExecutor) {
    executor(this._enqueue.bind(this));
  }
  private _enqueue(data: any) {
    console.log('enqueieng');
    if (this._awaitingDequeue) {
      this._awaitingDequeue(data);
    } else {
      this._queue.unshift(Promise.resolve(data));
    }
  }
  private async _dequeue() {}

  async dequeue() {
    if (!this._queue.length) {
      return new Promise((resolve, reject) => {
        this._awaitingDequeue = (data) => {
          resolve(data);
          this._awaitingDequeue = undefined;
        };
      });
    }
    return Promise.resolve(this._queue.pop());
  }
}

const queue = new Queue((enqueue) => {
  const s = new Server((socket) => {
    socket.on('data', (data) => {
      enqueue(data);
    });
  });

  s.listen(3000);
});

const test = async () => {
  while (true) {
    const r = await queue.dequeue();
    console.log(r);
  }
};
test();
