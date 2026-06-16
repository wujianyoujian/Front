/*
 * @lc app=leetcode.cn id=1 lang=typescript
 *
 * [1] 两数之和
 */

// @lc code=start
function twoSum(nums: number[], target: number): number[] {
  let map = new Map<number, number>();

  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    if (map.has(complement)) {
      return [map.get(complement)!, i];
    }
    map.set(nums[i], i);
  }
}
// @lc code=end

// @lc code=end

// function twoSum1(nums: number[], target: number): number[] {}

console.log(twoSum([1, 3, 4, 2], 6));
// 1, 2
// 4, 8, 11, 13, 14
//
// let nums = [1, 2, 3, 4, 7]
// let endPointList = [nums.length - 1]
// let array1: Number[] = []

// console.log(endPointList)
