/*
 * @lc app=leetcode.cn id=491 lang=typescript
 *
 * [491] 递增子序列
 */

// @lc code=start
function findSubsequences(nums: number[]): number[][] {
  let result: any = [];
  let path: any = [];

  function recurrence(startIndex: number) {
    if (path.length >= 2) {
      result.push([...path]);
    }

    let hasSet = new Set();
    for (let i = startIndex; i < nums.length; i++) {
      if (hasSet.has(nums[i]) || nums[i] < path[path.length - 1]) {
        continue;
      }
      hasSet.add(nums[i]);
      path.push(nums[i]);
      recurrence(i + 1);
      path.pop();
    }
  }

  recurrence(0);
  return result;
}
// @lc code=end

// findSubsequences([4, 4, 3, 2, 1]);
findSubsequences([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 1, 1, 1, 1, 1]);
