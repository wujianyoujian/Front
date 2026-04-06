/*
 * @lc app=leetcode.cn id=46 lang=typescript
 *
 * [46] 全排列
 */

// @lc code=start
function permute(nums: number[]): number[][] {
  let path: Array<number> = [];
  let result: Array<Array<number>> = [];

  let needLength = nums.length;

  function recurrence(startIndex: number, nums: Array<number>) {
    if (path.length == needLength) {
      return result.push([...path]);
    }

    for (let i = startIndex; i < nums.length; i++) {
      path.push(nums[i]);
      recurrence(
        0,
        nums.filter((item) => !path.includes(item))
      );
      path.pop();
    }
  }
  recurrence(0, nums);
  return result;
}
// @lc code=end

permute([0, 1]);
