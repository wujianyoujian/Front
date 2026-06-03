function createStaleTimer() {
  let count = 0;

  function startTimerWithStaleClosure() {
    const capturedCount = count; // 捕获第一次的 count，模拟闭包绑定旧状态
    
    setInterval(() => {
      console.log("Stale count is:", capturedCount);
      // count++ 这里不影响 capturedCount
    }, 1000);
  }

  return {
    increment() {
      count++;
    },
    startTimerWithStaleClosure,
    getCount() {
      return count;
    },
  };
}

const staleCounter = createStaleTimer();
staleCounter.startTimerWithStaleClosure();

setTimeout(() => {
  staleCounter.increment();
  console.log("Manually incremented stale count to:", staleCounter.getCount());
}, 3500);
