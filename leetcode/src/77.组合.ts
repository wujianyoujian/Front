/*
 * @lc app=leetcode.cn id=77 lang=typescript
 *
 * [77] 组合
 */

// @lc code=start
function combine(n: number, k: number): number[][] {
  const result: Array<Array<number>> = [];
  const path: Array<number> = [];

  function recurrence(n: number, k: number, startIndex: number) {
    if (path.length == k) {
      result.push([...path]);
      return;
    }

    for (let i = startIndex; i <= n - (k - path.length) + 1; i++) {
      path.push(i);
      recurrence(n, k, i + 1);
      path.pop();
    }
  }

  recurrence(n, k, 1);

  return result;
}
// @lc code=end
combine(4, 3)