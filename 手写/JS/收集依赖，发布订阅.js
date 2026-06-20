{
  const effectStack = []
  let activeEffect = null;
  const targetMap = new WeakMap();

  function track(target, key) {
    let depMap = targetMap.get(target);
    if (!depMap) {
      targetMap.set(target, depMap = new Map());
    }
    let deps = depMap.get(key);
    if (!deps) {
      depMap.set(key, deps = new Set())
    }
    if (activeEffect) {
      deps.add(activeEffect)
    }
  }

  function trigger(target, key) {
    const depMap = targetMap.get(target)
    const deps = depMap?.get(key);
    deps?.forEach(fn => fn())
  }

  function reactive(target) {
    return new Proxy(target, {
      get(target, key, receiver) {
        track(target, key);
        const result = Reflect.get(target, key, receiver);
        return typeof result === 'object' ? reactive(result) : result;
      },
      set(target, key, value, receiver) {
        const result = Reflect.set(target, key, value, receiver);
        trigger(target, key);
        return result
      }
    })
  }

  function effect(fn) {
    effectStack.push(fn);
    activeEffect = fn;
    fn();
    effectStack.pop();
    activeEffect = effectStack[effectStack.length - 1] ?? null
  }

  const state = reactive({ count: 2 });

  effect(() => {
    console.log(state.count)
  })

  state.count = 5
}