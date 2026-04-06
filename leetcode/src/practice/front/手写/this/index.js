/**
 * this 是当前执行上下文对象中一个属性
 * 在不同环境中全局对象可能不一样
 * browse this -> window
 * node this -> global
 * iframe, worker this -> self
 * 通用globalThis
 */
window.onload = function () {
  // console.log(globalThis);
  window.document.body.onclick = function () {
    console.log(this);
  };

  // window.document.body.onclick = (function () {
  //   console.log(this);
  // })();
};

class Teather {}

class Student extends Teather {
  constructor() {
    super();
    this.test = function () {
      console.log('non-static', 1);
    };
  }

  test() {
    console.log('static', 1);
  }
}

let s1 = new Student();
// 其实是相当于 this => {} => { test: () => {}, __proto__: { test: () => {} } }
// 因此会执行构造函数里面的方法
// s1.test();

// 链式调用bind 改变this 指向，只会执行一次

let obj = {
  a: 0,
  test: function () {
    setTimeout(function () {
      console.log(this);
    }, 0);
  },
};

obj.test();

// setTimeout 指向的对象是 window

let obj1 = {
  a: 0,
  test: function () {
    function test() {
      console.log(this);
    }
    test();
    (() => {
      console.log(this);
    })();
  },
};
obj1.test();

// 实例化 new 返回 this , return {} =>  { a : 0, ...}

// 绑定事件，事件处理函数中this 的指向 绑定的 dom 对象

// 并不存在
// window.onDOMContentLoaded = function() {
//   console.log('onDomContentLoaded')
// }

// window.addEventListener('DOMContentLoaded', function () {
//   console.log(this)
// })
window.addEventListener('DOMContentLoaded', () => {
  console.log(this);
});

(function () {
  function Student() {}

  Student.prototype.test = function () {
    console.log('static', 1);
  };

  let s1 = new Student();
  s1.test = function () {
    console.log('nonstatic', 1);
  };
  s1.test();
  console.log(s1);
})();
