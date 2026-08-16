let hook = { memoizedState: 0 };

function render() {
  // 每次 render，把字段的值"复制"成一个新的局部常量
  const count = hook.memoizedState;  // ← 快照，此刻的值

  return () => console.log(count);   // 闭包捕获这个局部常量
}

// 第一次渲染
hook.memoizedState = 0;
const read1 = render();  // read1 捕获的 count = 0

// 更新：字段被改写了
hook.memoizedState = 100;

const read2 = render();  // read2 捕获的 count = 100

read1(); // 0  ← 为什么不是 100？因为 read1 捕获的是"第一次 render 里的局部 count"
read2(); // 100