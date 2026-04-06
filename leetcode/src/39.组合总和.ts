/*
 * @lc app=leetcode.cn id=39 lang=typescript
 *
 * [39] 组合总和
 */

// @lc code=start
function combinationSum(candidates: number[], target: number): number[][] {
  const resArr: number[][] = [];
  function backTracking(
    candidates: number[],
    target: number,
    startIndex: number,
    route: number[],
    curSum: number
  ): void {
    if (curSum > target) return;
    if (curSum === target) {
      resArr.push(route.slice());
      return;
    }
    for (let i = startIndex, length = candidates.length; i < length; i++) {
      let tempVal: number = candidates[i];
      route.push(tempVal);
      backTracking(candidates, target, i, route, curSum + tempVal);
      route.pop();
    }
  }
  backTracking(candidates, target, 0, [], 0);
  return resArr;
}
// @lc code=end
combinationSum(
  [
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
  ],
  27
);
