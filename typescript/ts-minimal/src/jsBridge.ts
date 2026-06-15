class JSBridge {
  #pending = new Map<
    number,
    { resolve: Function; reject: Function; timer: number }
  >();
  #id = 0;
  #timeout = 10_000;
  #events = new Map<string, Set<Function>>();

  constructor() {
    (window as any).__bridgeCallBack = (json: string) => {
      const { id, result, error } = JSON.parse(json);
      const p = this.#pending.get(id);
      if (!p) return;
      clearTimeout(p.timer);
      this.#pending.delete(id);
      error ? p.reject(new Error(error)) : p.resolve(result);
    };

    (window as any).__bridgeNotify = (json: string) => {
      const { event, data } = JSON.parse(json);
      this.#events.get(event)?.forEach((fn) => {
        try {
          fn(data);
        } catch (e) {
          console.error("[Bridge] event error:", event, e);
        }
      });
    };
  }

  call(method: string, params = {}, timeout?: number) {
    const id = ++this.#id;
    return new Promise((resolve, reject) => {
      const timer = setTimeout(() => {
        reject(new Error(`Bridge call "${method}" timeout`));
        reject();
      }, this.#timeout);
      this.#pending.set(id, { resolve, reject, timer });
      const msg = JSON.stringify({ id, method, params });
      (window as any)?.webkit?.messageHandlers?.JSBridge?.postMessage(msg);
      // Android
      (window as any)?.JSBridge?.invoke?.(msg);
    });
  }

  on(event: string, handler: (data: unknown) => void) {
    if (!this.#events.has(event)) {
      this.#events.set(event, new Set());
    }
    this.#events.get(event)!.add(handler);
    return () => this.#events.get(event)?.delete(handler);
  }
}
