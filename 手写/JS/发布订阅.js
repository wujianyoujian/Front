class EventEmitter {
  constructor() {
    this.events = {};
  }
  on(event, fn) {
    if (!this.events[event]) {
      this.events[event] = [];
    }
    this.events[event].push(fn);
    return this;
  }

  emit(event, ...args) {
    const fns = this.events[event];
    if (!fns) return this;
    fns.forEach((fn) => fn(...args));
    return this;
  }

  off(event, fn) {
    if (!this.events[event]) return this;
    this.events[event] = this.events[event].filter((f) => fn !== f);
    return this;
  }
  once(event, fn) {
    const wrapper = (...args) => {
      fn(...args);
      this.off(event, wrapper);
    };
    this.on(event, wrapper);
    return this;
  }
}

const emitter = new EventEmitter();

emitter.on("click", (res) => {
  console.log(res);
});

emitter.emit("click", 1212);
