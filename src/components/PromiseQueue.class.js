export default class PromiseQueue {
  constructor () {
    this.queue = []
  }

  createCancellablePromise(fnPromise, fnCallback) {
    const queueItem = { promise: fnPromise(), callback: fnCallback, index: this.queue.length };
    this.queue.push(queueItem);
    queueItem.promise.then((result) => {
      if (queueItem.index === this.queue.length - 1) {
        queueItem.callback(result)
      }
    }).catch((err) => {
      console.log(err);
    }).finally(() => {
      this.queue[queueItem.index] = null;
      this.__garbageCollectionQueue();
    });
  }

  __garbageCollectionQueue () {
    let clearQueue = true;
    this.queue.forEach((item) => {
      if (item !== null) clearQueue = false;
    });
    if (clearQueue) this.queue = [];
  }
}
