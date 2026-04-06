/*
 * @lc app=leetcode.cn id=35 lang=typescript
 *
 * [35] 搜索插入位置
 */

// @lc code=start
function searchInsert(nums: number[], target: number): number {
  let left = 0;
  let right = nums.length - 1;
  let middle;
  while (left <= right) {
    middle = left + ((right - left) >> 1);
    if (nums[middle] > target) {
      right = middle - 1;
    } else if (nums[middle] < target) {
      left = middle + 1;
    } else {
      return middle;
    }
  }
  return left;
}
// @lc code=end

const res1 = searchInsert([1, 2, 3, 4, 6, 7], 8);
console.log(res1);
