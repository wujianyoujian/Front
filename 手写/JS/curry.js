function curry(fn) {
  return function curried(...args) {
    if (fn.length === args.length) {
      return fn.apply(this, args);
    }
    return function (...args2) {
      return curried.apply(this, args.concat(args2));
    };
  };
}

function add(x, y, z) {
  return x + y + z;
}

const curriedAdd = curry(add);

console.log(curriedAdd(1)(2)(5));
console.log(curriedAdd(1)(42)(5));
console.log(curriedAdd(1)(5, 2));

