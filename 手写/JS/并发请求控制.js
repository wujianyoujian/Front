class RequestPoll {
  constructor(limit = 3) {
    this.limit = limit;
    this.running = 0;
    this.queue = [];
    this.cache = new Map();
  }

  request(url, fetcher) {
    if (this.cache.has(url)) {
      return this.cache.get(url);
    }

    const promise = new Promise((resolve, reject) => {
      const task = () => {
        this.running++;
        fetcher(url)
          .then(resolve)
          .catch(reject)
          .finally(() => {
            this.running--;
            this.next();
          });
      };
      if (this.running < this.limit) {
        task();
      } else {
        this.queue.push(task);
      }
    });

    this.cache.set(url, promise);
    return promise;
  }

  next() {
    if (this.queue.length > 0 && this.running < this.limit) {
      this.queue.shift()();
    }
  }

  invalidate(url) {
    this.cache.delete(url);
  }

  clear() {
    this.cache.clear();
  }
}

class RequestPoll {
  constructor(maxConcurrent) {
    this.maxConcurrent = maxConcurrent;
    this.queue = [];
    this.running = 0;
  }

  add(requestFn) {
    return new Promise((resolve, reject) => {
      this.queue.push({ requestFn, resolve, reject });
      this.run();
    });
  }
  run() {
    while (this.running < this.maxConcurrent && this.queue.length > 0) {
      const { requestFn, resolve, reject } = this.queue.shift();
      this.running++;

      Promise.resolve(requestFn())
        .then(resolve)
        .catch(reject)
        .finally(() => {
          this.running--;
          this.run();
        });
    }
  }
}
