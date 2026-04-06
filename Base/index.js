// function bar() {
//   console.log("bar");
// }
// function foo() {
//   setTimeout(bar, 0);
//   for (let i = 0; i < 300; i++) {
//     let i = 5 + 8 + 8 + 8;
//     console.log(i);
//   }
// }
// foo();

// function executor(resolve, reject) {
//   let rand = Math.random();
//   console.log(1);
//   console.log(rand);
//   if (rand > 0.5) resolve();
//   else reject();
// }
// var p0 = new Promise(executor);

// var p1 = p0.then((value) => {
//   console.log("succeed-1");
//   return new Promise(executor);
// });

// var p3 = p1.then((value) => {
//   console.log("succeed-2");
//   return new Promise(executor);
// });

// var p4 = p3.then((value) => {
//   console.log("succeed-3");
//   return new Promise(executor);
// });

// p4.catch((error) => {
//   console.log("error");
// });

// new Promise((resolve => {

// }, reject => {

// }))
// var a = 2;
// function add(b, c) {
//   return b + c;
// }
// function addAll(b, c) {
//   var d = 10;
//   result = add(b, c);
//   return a + result + d;
// }
// addAll(3, 6);

// const container = document.querySelector(".list");

// const fragment = document.createDocumentFragment();

// for (let i = 1; i <= 1000; i++) {
//   const li = document.createElement("li");
//   li.textContent = `item ${i}`;
//   fragment.appendChild(li);
// }

// container.appendChild(fragment)

// const { resolve, reject, promise} = Promise.withResolvers()

// function Parent(name) {
//   this.name = name;
// }

// Parent.prototype.say = function () {
//   console.log("this is a parent");
// };

// function Child(name, type) {
//   Parent.call(this, name);
//   this.type = type;
// }

// Child.prototype = Object.create(Parent.prototype);
// Child.prototype.constructor = Child;

// function create(proto) {
//   function F() {}
//   F.prototype = proto
//   return new F();
// }

function deepClone(obj, hash = new WeakMap()) {
  let clone;

  if (typeof obj !== "object" || obj === null) {
    return obj;
  }

  if (typeof obj === "function") {
    return obj;
  }

  if (obj instanceof Date) {
    return new Date(obj);
  }

  if (obj instanceof RegExp) {
    return new RegExp(obj);
  }

  if (obj instanceof Set) {
    clone = new Set();
    hash.set(obj, clone);
    obj.forEach((value) => {
      clone.add(deepClone(value, hash));
    });
    return clone;
  }

  if (obj instanceof Map) {
    clone = new Map();
    hash.set(obj, clone);
    obj.forEach((value, key) => {
      clone.set(deepClone(key, hash), deepClone(value, hash));
    });
    return clone;
  }

  if (hash.has(obj)) {
    return hash.get(obj);
  }

  clone = Array.isArray(obj) ? [] : {};

  hash.set(obj, clone);

  const symKeys = Object.getOwnPropertySymbols(obj);
  for (let symKey of symKeys) {
    clone[symKey] = deepClone(obj[symKey], hash);
  }

  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      clone[key] = deepClone(obj[key], hash);
    }
  }
  return clone;
}

let key = Symbol("key");

let a = {
  title: "测试",
  obj: {
    title: "你好",
    set: new Set([1, 2, 3]),
    map: new Map([
      ["key", "value"],
      ["title", "lisi"],
    ]),
  },
  [key]: "title",
};

a.self = a;

let b = deepClone(a);

console.log(b);

console.log(b[key]);

console.log(Symbol("key") === Symbol("key"));

async function async1() {
  console.log('async1 start');
  await async2();
  console.log('async1 end');
}

async function async2() {
  console.log('async2');
}

console.log('script start');

setTimeout(() => console.log('                '), 0);

async1();

new Promise(resolve => {
  console.log('promise1');
  resolve();
}).then(() => console.log('promise2'));

console.log('script end');

// script start
// async1 start
// async2
// Promise1
// script end
