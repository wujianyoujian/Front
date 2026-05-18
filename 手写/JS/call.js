// Function.prototype.myCall = function (context, ...args) {
//   context = context ?? globalThis;
//   const key = Symbol();
//   context[key] = this;
//   const result = context[key](...args);
//   delete context[key];
//   return result;
// };

Function.prototype.myCall = function (context, ...args) {
  context = context ?? globalThis;
  const key = Symbol();
  context[key] = this;
  const result = context[key](...args);
  delete context[key];
  return result;
};

Function.prototype.myApply = function (context, args = []) {
  context = context ?? globalThis;
  const key = Symbol();
  context[key] = this;
  const result = context[key](...args);
  delete context[key];
  return result;
};

Function.prototype.myBind = function (context, ...preArgs) {
  context = context ?? globalThis;

  const fn = this;

  function bound(...args) {
    return fn.apply(this instanceof bound ? this : context, [...preArgs, ...args]);
  }

  bound.prototype = Object.create(fn.prototype);

  return bound;
};
