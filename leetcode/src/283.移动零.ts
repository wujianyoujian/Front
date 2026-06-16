/*
 * @lc app=leetcode.cn id=283 lang=typescript
 *
 * [283] 移动零
 */

// @lc code=start
/**
 Do not return anything, modify nums in-place instead.
 */
function moveZeroes(nums: number[]): void {
  let slowIndex = 0;
  let fastIndex = 0;
  let defaultValue = 0;

  for (; fastIndex < nums.length; fastIndex++) {
    if (defaultValue !== nums[fastIndex]) {
      nums[slowIndex] = nums[fastIndex];
      slowIndex++;
    }
  }

  for (let i = slowIndex; i < nums.length; i++) {
    nums[i] = 0;
  }
}
// @lc code=end

moveZeroes([0, 1, 0, 3, 12]);
