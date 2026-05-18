// const obj = { name: "tom", age: 18 };

// const proxy = new Proxy(obj, {
//   get(target, key, receiver) {
//     console.log(key, target, receiver);
//     return Reflect.get(target, key, receiver);
//   },
//   set(target, key, value, receiver) {
//     throw Error("无法赋值");
//     // console.log(`设置 ${key} = ${value}`);
//     // return Reflect.set(target, key, value, receiver);
//   },
//   deleteProperty(target, key) {
//     console.log(`删除 ${key} = ${target}`);
//     return Reflect.deleteProperty();
//   },
// });

// console.log(proxy.age);
// proxy.age = 12;

// const state = { count: 0 };

// console.log(`count is: ${state.count}`);

let activeEffect = null;

const state = new Proxy(
  { count: 0 },
  {
    get(target, key, receiver) {
      track(target, key);
      return Reflect.get(target, key, receiver);
    },
    set(target, key, value, receiver) {
      const result = Reflect.set(target, key, value, receiver);
      return result;
    },
  }
);

function update() {
  console.log(state, `$count 变了，新值是 ${state.count}`);
}

activeEffect = update;
update();
activeEffect = null;

// state.count = 1;
// state.count = 2;
