// function throttle(fn, wait = 300) {
//   let lastTime = 0;
//   return function (...args) {
//     const now = Date.now();
//     if (now - lastTime >= wait) {
//       lastTime = now;
//       fn.apply(this, args);
//     }
//   };
// }

// function throttle1(fn, wait = 300) {
//   let timer = null;
//   return function (...args) {
//     if (!timer) {
//       timer = setTimeout(() => {
//         fn.apply(this, args);
//         timer = null;
//       }, wait);
//     }
//   };
// }

// function throttle2(fn, wait = 300) {
//   let lastTime = 0;
//   let timer = null;

//   return function (...args) {
//     const now = Date.now();
//     const remainTime = wait - (now - lastTime);

//     clearTimeout(timer);

//     if (remainTime <= 0) {
//       lastTime = now;
//       fn.apply(this, args);
//     } else {
//       timer = setTimeout(() => {
//         lastTime = Date.now();
//         fn.apply(this, args);
//       }, remainTime);
//     }
//   };
// }

function throttle(fn, wait = 300) {
  let lastTime = 0;
  return function (...args) {
    const now = Date.now();
    if (now - lastTime - wait >= 0) {
      fn.apply(this, args);
      lastTime = now;
    }
  };
}

function throttle1(fn, wait = 300) {
  let timer = null;
  return function (...args) {
    if (!timer) {
      timer = setTimeout(() => {
        fn.apply(this, args);
        timer = null;
      }, wait);
    }
  };
}

function throttle2(fn, wait = 3000) {
  let timer = null;
  let lastTime = 0;

  return function (...args) {
    let now = Date.now();
    let remainTime = wait - (now - lastTime);

    clearTimeout(timer);

    if (remainTime <= 0) {
      fn.apply(this, args);
      lastTime = now;
    } else {
      timer = setTimeout(() => {
        fn.apply(this, args);
        lastTime = now;
      }, wait);
    }
  };
}

function throttle3(fn, wait = 300) {
  let timer = null;
  let lastTime = 0;

  return function (...args) {
    const now = Date.now();
    const remainTime = wait - (now - lastTime);

    clearTimeout(timer);

    if (remainTime <= 0) {
      fn.apply(this, args);
      lastTime = now;
    } else {
      timer = setTimeout(() => {
        lastTime = Date.now();
        fn.apply(this, args);
      }, wait);
    }
  };
}

window.onload = function () {
  let $area = document.querySelector("#area");

  $area.addEventListener(
    "mousemove",
    throttle2(function (e) {
      console.log(e);
    }, 1000)
  );
};
