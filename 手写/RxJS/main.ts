import { filter, Observable, of } from "rxjs";

const stream$ = of(1, 2, 3, 4).pipe(filter((item) => item >= 2));
stream$.subscribe({
  next: (value) => console.log(value),
});
// const stream$ = new Observable((subscriber) => {
//   subscriber.next(1);
//   subscriber.next(2);
//   subscriber.next(3);
//   subscriber.complete();
// });

// stream$.subscribe({
//   next: (value) => console.log(value), // 1, 2, 3
//   error: (err) => console.error(err),
//   complete: () => console.log("完成"),
// });

// 6;
// timer
// pending useCallback
// idle prepare
// poll
// check
// close

// setTimeout(() => console.log("setTimeout"), 0);
// Promise.resolve().then(() => console.log("promise"));
// setImmediate(() => console.log("setImmediate"));
// process.nextTick(() => console.log("nextTick"));

// setTimeout
// promise
// nextTick
// setImmediate
Promise.resolve().then(() => console.log("promise"));
queueMicrotask(() => console.log("queueMicrotask"));
process.nextTick(() => console.log("nextTick"));
