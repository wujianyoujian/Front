let activeEffect = null;

const targetMap = new WeakMap();
const effectStack = [];

function track(target, key) {
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

function trigger(target, key) {
  const depsMap = targetMap.get(target);
  if (!depsMap) return;

  //   {
  //     {count: 0}: { count: fn() }
  //   }
  const deps = depsMap.get(key);
  if (deps) {
    deps.forEach((fn) => fn());
  }
}

const state = new Proxy(
  { count: 0 },
  {
    get(target, key, receiver) {
      track(target, key);
      return Reflect.get(target, key, receiver);
    },
    set(target, key, value, receiver) {
      const result = Reflect.set(target, key, value, receiver);
      trigger(target, key);
      return result;
    },
  }
);

function effect(fn) {
  effectStack.push(fn);
  activeEffect = fn;
  fn();
  effectStack.pop();
  activeEffect = effectStack[effectStack.length - 1];
}

effect(() => {
  console.log("count is:", state.count);
});

effect(() => {
  console.log("count is:", state.count);
});

state.count = 1;
state.count = 2;
