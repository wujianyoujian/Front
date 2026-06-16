/*
 * @lc app=leetcode.cn id=80 lang=typescript
 *
 * [80] 删除有序数组中的重复项 II
 */

// @lc code=start
function removeDuplicates(nums: number[]): number {
  let slow = 0;
  let fast = 0;
  for (; fast < nums.length; fast++) {
    if (slow < 2 || nums[fast] !== nums[slow - 2]) {
      nums[slow] = nums[fast];
      slow++
    }
  }
}
// @lc code=end
