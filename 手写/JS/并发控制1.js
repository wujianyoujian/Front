function createLeak() {
  const hugeData = new Array(10000000).fill("🐛"); // 大量数据
  return function onClick() {
    console.log("clicked");
    // 虽然不用 hugeData，但 V8 闭包机制仍会保留它的引用
  };
}
const handler = createLeak(); // hugeData 永久泄漏

let $btn = document.querySelector("#btn");

$btn.onclick = function () {
  handler();
};
