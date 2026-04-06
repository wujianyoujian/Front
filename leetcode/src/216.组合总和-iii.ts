/*
 * @lc app=leetcode.cn id=216 lang=typescript
 *
 * [216] 组合总和 III
 */

// @lc code=start
function combinationSum3(k: number, n: number): number[][] {
  let path: Array<number> = [];
  let result: Array<Array<number>> = []

  function recurrence(arr: number, k: number, startIndex: number) {
    if (path.length === k && path.reduce((pre, cur) => pre + cur, 0) == n) {
      result.push([...path])
      return
    }

    for (let i = startIndex; i <= arr; i ++) {
      path.push(i);
      recurrence(arr, k, i + 1)
      path.pop()
    }
  }
  recurrence(9, k, 1)
  return result
};
// @lc code=end


combinationSum3(9, 45)
