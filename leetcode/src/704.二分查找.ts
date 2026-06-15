/*
 * @lc app=leetcode.cn id=704 lang=typescript
 *
 * [704] 二分查找
 */

// @lc code=start
function search(nums: number[], target: number): number {
  // let left = 0;
  // let right = nums.length - 1;

  // while (left <= right) {
  //   let middle = left + ((right - left) >> 1);

  //   if (nums[middle] === target) {
  //     return middle;
  //   } else if (nums[middle] > target) {
  //     right = middle - 1;
  //   } else if (nums[middle] < target) {
  //     left = middle + 1;
  //   }
  // }
  // return -1;

  let left = 0;
  let right = nums.length;
  while (left < right) {
    let middle = left + ((right - left) >> 1);

    if (nums[middle] === target) {
      return middle;
    } else if (nums[middle] > target) {
      right = middle;
    } else if (nums[middle] < target) {
      left = middle + 1;
    }
  }
  return -1;
}
// @lc code=end
{
  let result = search([-1, 0, 3, 5, 9, 12, 1], 9);
  let result1 = search([-1, 0, 3, 5, 9, 12], 2);
  console.log(result);
}
