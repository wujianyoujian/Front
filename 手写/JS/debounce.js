function deBounce(fn, { wait = 300, immediate = true }) {
  let timer = null;

  return function (...args) {
    const callNow = immediate && !timer;
    clearTimeout(timer);

    timer = setTimeout(() => {
      timer = null;
      if (!immediate) {
        fn.apply(this, args);
      }
    }, wait);

    if (callNow) fn.apply(this, args);
  };
}

window.onload = function () {
  const $btn = document.querySelector("#btn");
  $btn.addEventListener(
    "click",
    deBounce(function () {
      console.log(123);
    }, {})
  );
};

function deBounce(fn, { wait = 300, immediate = true }) {
  let timer = null;

  return function (...args) {
    const canNow = immediate && !timer;
    clearTimeout(timer);

    timer = setTimeout(() => {
      timer = null;
      if (!immediate) {
        fn.apply(this, args);
      }
    }, wait);

    if (canNow) fn.apply(this, args);
  };
}

function deBounce3(fn, { wait = 300, immediate = true }) {
  let timer = null;
  return function (...args) {
    const canNow = immediate && !timer;
    clearTimeout(timer);

    timer = setTimeout(() => {
      timer = null;
      if (!immediate) {
        fn.apply(this, args);
      }
    }, []);

    if (canNow) fn.apply(this, args);
  };
}

function deBounce4(fn, { wait = 300, immediate = true }) {
  let timer = null;

  return function (...args) {
    const canNow = immediate && !timer;

    clearTimeout(timer);

    timer = setTimeout(() => {
      timer = null;
      if (!immediate) {
        fn.apply(this, args);
      }
    }, wait);

    if (canNow) fn.apply(this, args);
  };
}

function deBounce5(fn, { wait = 300, immediate = ture }) {
  let timer = null;
  return function (...args) {
    let canNow = immediate && !timer;
    clearTimeout(timer);
    timer = setTimeout(() => {
      timer = null;
      if (!immediate) {
        fn.apply(this, args);
      }
    }, wait);
    if (canNow) {
      fn.apply(this, args);
    }
  };
}

function debounce6(fn, { wait, immediate }) {
  let timer = null;
  return function (...args) {
    let canNow = immediate && !timer;
    clearTimeout(timer);
    timer = setTimeout(() => {
      timer = null;
      if (!immediate) {
        fn.apply(this, args);
      }
    }, wait);

    if (canNow) {
      fn.apply(this, args);
    }
  };
}

function debounce5(fn, { wait, immediate }) {
  let timer = null;

  return function (...args) {
    const canNow = immediate && !timer;

    clearTimeout(timer);

    timer = setTimeout(function () {
      timer = null;

      if (!immediate) {
        fn.apply(this, args);
      }
    }, wait);

    if (canNow) {
      fn.apply(this, args);
    }
  };
}




function debounce6(fn, { wait, immediate = true }) {
  let timer = null
  return function (...args) {
    const canNow = !timer && immediate;

    clearTimeout(timer);

    timer = setTimeout(() => {
      timer = null
      if (!immediate) {
        fn.apply(this, args)
      }
    }, wait)

    if (canNow) {
      fn.apply(this, args)
    }
  }
}