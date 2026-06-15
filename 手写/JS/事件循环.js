// console.log(1);

// setTimeout(() => console.log(2), 100);

// Promise.resolve().then(() => {
//   console.log("3");
//   Promise.resolve().then(() => {
//     console.log("5");
//     Promise.resolve().then(() => console.log("6"));
//   });
// });

// console.log(4);

// 1 4 3 5 2

// console.log("start");

// setTimeout(() => {
//   console.log("setTimeout");
//   Promise.resolve().then(() => console.log("p in setTimeout"));
// }, 0);

// Promise.resolve()
//   .then(() => {
//     console.log("p1");
//     setTimeout(() => console.log("p1 inner setTimeout"), 0);
//   })
//   .then(() => console.log("p2"));

// console.log("end");

// start end p1 setTimeout p1 inner setTimeout p2

console.log("1");

new Promise((resolve) => {
  console.log("2");
  resolve();
  console.log("3");
}).then(() => console.log("4"));

console.log("5");

// 1 2 3 5 4
