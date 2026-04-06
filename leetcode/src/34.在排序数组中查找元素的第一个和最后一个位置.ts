/*
 * @lc app=leetcode.cn id=34 lang=typescript
 *
 * [34] 在排序数组中查找元素的第一个和最后一个位置
 */

// @lc code=start
function searchRange(nums: number[], target: number): number[] {
  let left = 0;
  let rigth = nums.length - 1;
  let middle;
  while (left <= rigth) {
    middle = left + ((rigth - left) >> 1);
    if (nums[middle] > target) {
      rigth = middle - 1;
    } else if (nums[middle] < target) {
      left = middle + 1;
    } else if (nums[middle] === target) {
      let start;
      let end;
      for (let i = left; i <= rigth; i++) {
        if (nums[i] === target) {
          start = i;
          break;
        }
      }
      for (let i = rigth; i >= left; i--) {
        if (nums[i] === target) {
          end = i;
          break;
        }
      }
      return [start, end];
    }
  }
  return [-1, -1];
}
// @lc code=end
{
  // const result = searchRange([5, 7, 7, 8, 8, 10], 8);
  // console.log(result);
  // const result1 = searchRange([1, 6, 6, 7, 7, 8, 8, 10], 6);
  // console.log(result1);
  // const result2 = searchRange([6], 6);
  // console.log(result2);
  // const result3 = searchRange([1, 2, 3], 2);
  // console.log(result3);

  // const result4 = searchRange([3, 3, 3], 3);
  // console.log(result4);

  const result5 = searchRange([1, 2, 4, 3, 3, 3, 3, 3, 3, 3, 3], 3);
  console.log(result5);
}
