// function myNew(constructor, ...args) {
//   const obj = Object.create(constructor.prototype);
//   const result = constructor.call(obj, ...args);
//   return result instanceof Object ? result : obj;
// }

// function myNew(constructor, ...args) {
//   const obj = Object.create(constructor.prototype);
//   const result = constructor.apply(obj, args);
//   return result instanceof Object ? result : obj;
// }

function myNew(constructor, ...args) {
  const obj = Object.create(constructor.prototype);
  const result = constructor.apply(obj, args);
  return result instanceof Object ? result : obj;
}

function myNew1(constructor, ...args) {
  const obj = Object.create(constructor.prototype);
  const result = constructor.apply(obj, args);
  return result instanceof Object ? result : obj;
}

function myNew2(constructor, ...args) {
  const obj = Object.create(constructor.prototype);
  const result = constructor.apply(obj, args);
  return result instanceof Object ? result : obj;
}
