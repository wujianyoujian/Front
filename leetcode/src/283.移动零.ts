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
  let deleteValue = 0
  let fastIndex = 0;
  let lastIndex = 0;
  for (;fastIndex < nums.length; fastIndex ++) {
    if (nums[fastIndex] != deleteValue) {
      nums[lastIndex] = nums[fastIndex]
      lastIndex++
    }
  }
  for (let i = lastIndex; i < nums.length; i ++) {
    nums[i] = 0;
  }
  console.log(nums)
};
// @lc code=end

moveZeroes([0, 1, 0, 3, 12]);
                             