function ObjectIs(x, y) {
  if (x === y) {
    return x !== 0 || 1 / x === 1 / y;
  }

  return x !== x && y !== y;
}

// console.log(foo);

// function foo() {}

// var foo = 12;

// console.log(foo);

// function runStack(n) {
//   if (n === 0) return 100;
//   return runStack(n - 2);
// }

function runStack(n) {
  let result = 100;
  for (let i = n; i > 0; i -= 2) {
    result = result;
  }
  return result;
}
console.log(runStack(50000));


function addCounter() {
  let count = 0;

  return {
    increment: function () {
      count++;
    },
    getCount: function () {
      return count;
    },
  };
}

const { increment, getCount } = addCounter();
console.log(getCount());
increment();
increment();
console.log(getCount());

var bar = {
  myName: "time.geekbang.com",
  printName: function () {
    console.log(myName);
  },
};
function foo() {
  let myName = "极客时间";
  return bar.printName;
}
let myName = "极客邦";
let _printName = foo();
_printName();
bar.printName();
