function concurrent(tasks, limit) {
  return new Promise((resolve) => {
    const results = []
    let running = 0;
    let i = 0;

    function next() {
      if (running === 0 && i === tasks.length) {
        resolve(results)
      }
      while (running < limit && i < tasks.length) {
        const idx = i++;
        running++;
        tasks[idx]().then((res) => {
          console.log(res)
          results[idx] = res
        }).catch((err) => {
          results[idx] = err
        }).finally(() => {
          running--;
          next()
        })
      }
    }
    next()
  })
}

const delay = (ms, val) => () => new Promise(r => setTimeout(() => r(val), ms));
const tasks = [
  delay(1000, 'A'),
  delay(500, 'B'),
  delay(300, 'C'),
  delay(800, 'D'),
  delay(200, 'E'),
  delay(1000, 'F'),
  delay(500, 'G'),
  delay(300, 'H'),
  delay(800, 'I'),
  delay(200, 'J'),
];
concurrent(tasks, 2).then(console.log);

{
  function concurrent(tasks, limit) {
    return Promise((resolve) => {
      const results = [];
      let running = 0;
      let i = 0;

      function next() {
        if (running == 0 && i === tasks.length) {
          resolve(results);
        }
        while (running < limit && i < tasks.length) {
          const idx = i++;
          running++;

          tasks[idx]().then((res) => {
            console.log(res)
            results[idx] = res
          }).catch((err) => {
            results[idx] = err
          }).finally(() => {
            running--;
            next()
          })
        }
      }
      next()
    })
  }
}