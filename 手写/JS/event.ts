type Handler<T = unknown> = (data: T) => void;

class EventEmitter {
  private events = new Map<string, Set<Handler>>();
  private cache = new Map<string, unknown[]>();

  on<T>(event: string, handler: Handler<T>, replay = false) {
    if (!this.events.has(event)) {
      this.events.set(event, new Set());
    }
    this.events.get(event)!.add(handler as Handler);

    if (replay) {
      this.cache.get(event)?.forEach((data) => handler(data as T));
    }

    return () => this.off(event, handler);
  }

  off<T>(event: string, handler: Handler<T>) {
    this.events.get(event)?.delete(handler as Handler);
  }

  emit<T>(event: string, data: T, cache = false) {
    if (cache) {
      if (!this.cache.has(event)) this.cache.set(event, []);
      this.cache.get(event)!.push(data);
    }
    this.events.get(event)?.forEach((handler) => handler(data));
  }

  once<T>(event: string, handler: Handler<T>) {
    const wrapper: Handler<T> = (data) => {
      handler(data);
      this.off(event, wrapper);
    };
    this.on(event, wrapper);
  }
}

const emitter = new EventEmitter();

emitter.emit("send", 1222, true);

emitter.on(
  "send",
  (data) => {
    console.log(data);
  },
  true
);
