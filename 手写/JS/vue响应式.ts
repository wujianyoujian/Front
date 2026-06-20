{type EffectFn = () => void;
type Target = object;
type Key = string | symbol;
type DepsMap = Map<Key, Set<EffectFn>>;

let activeEffect: EffectFn | null = null;

const targetMap = new WeakMap<Target, DepsMap>();
// [{ count: 1 }]: { count: new Set() [fn] }
const effectStack: EffectFn[] = [];

function track(target: Target, key: Key): void {
  if (!activeEffect) return;
  let depsMap = targetMap.get(target);
  if (!depsMap) {
    targetMap.set(target, (depsMap = new Map()));
  }
  let deps = depsMap.get(key);
  if (!deps) {
    depsMap.set(key, (deps = new Set()));
  }
  deps.add(activeEffect);
}

function trigger(target: Target, key: Key): void {
  const depsMap = targetMap.get(target);
  if (!depsMap) return;
  const deps = depsMap.get(key);
  if (deps && deps.size) {
    deps.forEach((fn) => fn());
  }
}

function reactive<T extends Target>(target: T): T {
  return new Proxy(target, {
    get(target, key, receiver) {
      track(target, key);
      const result = Reflect.get(target, key, receiver);
      return typeof result === 'object' && result !== null ?  reactive(result) :result;
    },
    set(target, key, value, receiver) {
      const oldValue = Reflect.get(target, key, receiver);
      const result = Reflect.set(target, key, value, receiver);
      if (!Object.is(oldValue, value)) trigger(target, key);
      return result
    },
  });
}

function effect(fn: EffectFn): void {
  effectStack.push(fn);
  activeEffect = fn;
  fn();
  effectStack.pop();
  activeEffect = effectStack[effectStack.length - 1] ?? null;
}

const state = reactive({ count: 1, number: 30 });

const state1 = reactive({ city: {  } })

effect(() => {
  console.log("count is", state.count);
});

effect(() => {
  console.log("number is", state.number);
});

state.count = 2;

state.number = 90;
}