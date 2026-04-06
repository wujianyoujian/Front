/*
 * @lc app=leetcode.cn id=40 lang=typescript
 *
 * [40] 组合总和 II
 */

// @lc code=start
function combinationSum2(candidates: number[], target: number): number[][] {
  let path: Array<number> = [];
  let result: Array<Array<number>> = [];

  function recurrence(
    candidates: number[],
    startIndex: number,
    used: Array<boolean>,
    sum: number
  ) {
    if (path.length > 0) {
      // let sum = path.reduce((pre, cur) => pre + cur, 0);
      if (sum === target) {
        return result.push([...path]);
      }
    }

    for (let i = startIndex; i < candidates.length; i++) {
      if (sum + candidates[i] > target) {
        continue;
      }
      if (i > 0 && candidates[i] == candidates[i - 1] && !used[i - 1]) {
        continue;
      }
      sum += candidates[i];
      path.push(candidates[i]);
      used[i] = true;
      recurrence(candidates, i + 1, used, sum);
      sum -= candidates[i];
      used[i] = false;
      path.pop();
    }
  }

  let used = candidates.map((item) => false);
  candidates.sort((a, b) => a - b);
  recurrence(candidates, 0, used, 0);
  return result;
}
// @lc code=end
combinationSum2([10, 1, 2, 7, 6, 1, 5], 8);
