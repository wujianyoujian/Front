/*
 * @lc app=leetcode.cn id=167 lang=typescript
 *
 * [167] 两数之和 II - 输入有序数组
 */

// @lc code=start
function twoSum(numbers: number[], target: number): number[] {
  // let left = 0;
  // let right = numbers.length - 1;
  // let nums = 0;
  // while (left < right) {
  //   nums = numbers[left] + numbers[right];
  //   if (nums === target) {
  //     return [left + 1, right + 1];
  //   } else if (nums > target) {
  //     right--;
  //   } else if (nums < target) {
  //     left++;
  //   }
  // }
  // return [-1, -1];
  let map = new Map();

  for (let i = 0; i < numbers.length; i++) {
    const complete = target - numbers[i];

    if (map.has(complete)) {
      return [map.get(complete) + 1, i + 1];
    }

    map.set(numbers[i], i);
  }
  return [-1, -1];
}
// @lc code=end
