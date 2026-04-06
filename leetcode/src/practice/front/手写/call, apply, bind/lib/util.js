const FunctionExtendsUtils = ((Function) => {
  Function.prototype.myCall = function (context = window, ...args) {
    if (typeof context !== 'object') {
      context = new Object(context);
    }
    let fnKey = Symbol();

    context[fnKey] = this;

    let result = context[fnKey](...args);
    delete context[fnKey];
    return result;
  };

  // 更改下传递参数即可
  Function.prototype.myApply = function () {};

  Function.prototype.myBind = function (context, ...args) {
    let self = this;

    let fBound = function (...innnerArgs) {
      return self.apply(this instanceof fBound ? this : context, args.concat(innnerArgs));
    };

    fBound.prototype = Object.create(this.prototype);

    return fBound;
  };
})(Function);

export default FunctionExtendsUtils;
