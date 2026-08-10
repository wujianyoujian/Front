{
  let effectActive = null;
  let effectList = [];
  let targetMap = new WeakMap();

  function track(target, key) {
    let depsMap = targetMap.get(target);
    if (!depsMap) {
      targetMap.set(target, depsMap = new Map())
    }
    let deps = depsMap.get(key);
    if (!deps) {
      depsMap.set(key, deps = new Set())
    }
    if (effectActive) {
      deps.add(effectActive)
    }
  }

  function trigger(target, key) {
    const depsMap = targetMap.get(target);
    const deps  = depsMap.get(key);

    deps?.forEach((fn) => fn())
  }

  function reactive(obj) {
    return new Proxy(obj, {
      get(target, key, receiver) {
        track(target, key);
        const resut = Reflect.get(target, key, receiver);
        return typeof resut === 'object' ? reactive(resut) : resut
      },
      set(target, key, value, receiver) {
        const result = Reflect.set(target, key, value, receiver);
        trigger(target, key);
        return result
      }
    })
  }

  function effect(fn) {
    effectList.push(fn);
    effectActive = fn;
    fn()
    effectList.pop();
    effectActive = effectList[effectList.length - 1] ?? null
  }

  let obj = { count: 2 };

  const state = reactive(obj)

  effect(() => {
    console.log(state.count)
  })
  state.count = 12
}