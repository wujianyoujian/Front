// function curry(fn) {
//   return function curried(...args) {
//     if (fn.length === args.length) {
//       return fn.apply(this, args);
//     }
//     return function (...args2) {
//       return curried.apply(this, args.concat(args2));
//     };
//   };
// }

function add(x, y, z) {
  return x + y + z;
}

const curriedAdd = curry(add);

console.log(curriedAdd(1)(2)(5));
console.log(curriedAdd(1)(42)(5));
console.log(curriedAdd(1)(5, 2));

function curry(fn) {
  return function curried(...args1) {
    if (fn.length === args1.length) {
      return fn.apply(this, args1);
    }

    return function (...args2) {
      return curried.apply(this, args1.concat(args2));
    };
  };
}
