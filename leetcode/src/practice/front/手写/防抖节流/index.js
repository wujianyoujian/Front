window.onload = function () {
  window.document.onclick = throttle1((e) => {
    console.log(e);
  }, 1000);
};

/**
 * 防抖函数
 * @param {Function} fn
 * @param {number} delay
 * @param {bool} immediately
 * @returns
 */
function debounce(fn, delay, immediately = false) {
  let timer = null;
  return function () {
    if (immediately) {
      fn.apply(this, arguments);
    } else {
      if (timer) {
        clearTimeout(timer);
      }
      timer = setTimeout(() => {
        fn.apply(this, arguments);
      }, delay);
    }
  };
}

/**
 *
 * @param {Function} fn
 * @param {number} delay
 */
function throttle1(fn, delay) {
  let lastTime = Date.now();
  return function () {
    let nowTime = Date.now();
    if (nowTime > lastTime + delay) {
      fn.call(this, ...arguments);
      lastTime = Date.now();
    }
  };
}

/**
 * 节流函数
 * @param {Function} fn
 * @param {number} delay
 * @param {bool} immediately
 */
function throttle(fn, delay, immediately = false) {
  let timer = null;
  return function () {
    if (immediately) {
      fn.call(this, ...arguments);
      immediately = false;
    } else {
      if (!timer) {
        timer = setTimeout(() => {
          fn.call(this, ...arguments);
          timer = null;
        }, delay);
      }
    }
  };
}

/**
 * instanceof 实现
 * @param {Object} instance
 * @param {FunctionConstructor} classFnc
 * @returns
 */
function _instance(instance, classFnc) {
  if (typeof instance !== 'object' || !instance) {
    return false;
  }
  let proto = Object.getPrototypeOf(instance);
  while (proto) {
    if (proto == classFnc.prototype) {
      return true;
    }
    proto = Object.getPrototypeOf(proto);
  }
  return false;
}
