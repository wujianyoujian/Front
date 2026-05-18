function red() {
  console.log("red");
}

function yellow() {
  console.log("yellow");
}

function green() {
  console.log("green");
}

function light(fn) {
  let random = Math.floor(Math.random() * 5) + 1;

  return new Promise((resolve) => {
    setTimeout(() => {
      fn();
      resolve();
    }, random * 1000);
  });
}

function start() {
  return Promise.resolve()
    .then(() => {
      return light(red);
    })
    .then(() => {
      return light(yellow);
    })
    .then(() => {
      return light(green);
    })
    .then(() => {
      start();
    });
}

start();
