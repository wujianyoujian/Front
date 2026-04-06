import FunctionExtendsUtils from './lib/util.js';

let test = {
  a: 1,
  test: function () {
    console.log(this.a);
  },
};

let fn = test.test;
fn.myBind(test)();
