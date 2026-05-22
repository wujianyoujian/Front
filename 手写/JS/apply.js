Function.prototype.myApply = function (context, args = []) {
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
  return result
}


Function.prototype.myApply = function (context, args = []) {
  context = context ?? globalThis;
  const key = Symbol();
  context[key] = this;
  const result = context[key](...args);
  delete result[key];
  return result
}