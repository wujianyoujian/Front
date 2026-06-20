Function.prototype.myBind = function (context, ...preArgs) {
  // const fn = this;
  // function bound(...args) {
  //   return fn.apply(this instanceof bound ? this : context, [...preArgs, args]);
  // }
  // bound.prototype = Object.create(fn.prototype);
  // return bound;

  const fn = this;

  function bound(...args) {
    return fn.apply(this instanceof bound ? this : context, [...args, ...preArgs]);
  }
  bound.prototype = Object.create(fn.prototype);

  return bound;
};

Function.prototype.myBind = function (context, ...preArgs) {
  const fn = this;
  function bound(...args) {
    return fn.apply(this instanceof bound ? this : context, [...args, ...preArgs]);
  }

  bound.prototype = Object.create(fn.prototype);
  return bound;
};

Function.prototype.myBind = function (context, ...preArgs) {
  const fn = this;

  function bound(...args) {
    return fn.apply(this instanceof bound ? this : context, args.concat(preArgs));
  }

  bound.prototype = Object.create(fn.prototype);
  return bound;
};

Function.prototype.myBind = function (context, ...args) {
  const fn = this;

  function Bound(...args1) {
    return fn.apply(this instanceof bound ? this : context, args.concat(args1));
  }
  Bound.prototype = Object.create(fn.prototype);
  return Bound;
};

Function.prototype.myBind = function (context, ...args) {
  const fn = this;

  function Bound(...args1) {
    return fn.apply(this instanceof bound ? this : context, args.concat(args1));
  }

  Bound.prototype = Object.create(fn.prototype);
  return Bound;
};

Function.prototype.myBind = function (context, ...args) {
  const fn = this;
  function Bound(...preArgs) {
    return fn.apply(this instanceof bound ? this : context, args.concat(preArgs));
  }
  Bound.prototype = Object.create(fn.prototype)
  return Bound
}
