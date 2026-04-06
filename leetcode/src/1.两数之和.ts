/*
 * @lc app=leetcode.cn id=1 lang=typescript
 *
 * [1] 两数之和
 */

// @lc code=start
function twoSum(nums: number[], target: number): number[] {
  let array1 = []
  let endPointList: number[] = [nums.length - 1]
  for (let i = 0; i < nums.length; i++) {
    array1.push(...nums.slice(i, nums.length))
  }
  for (let i = nums.length - 1; i > 0; i--) {
    endPointList.push(endPointList[nums.length - i - 1] + i)
  }
  let k = 0
  let l: number = 0
  for (let i = 0; i < array1.length; i++) {
    if (array1[k] + array1[i] === target && k !== i) {
      l = array1[i]
      break
    }
    if (endPointList.includes(i)) {
      k++
      continue
    }
  }
  return [k, nums.findIndex((item, index) => k !== index && item === l)]
}
// @lc code=end

// @lc code=end

// function twoSum1(nums: number[], target: number): number[] {}

console.log(twoSum([1, 3, 4, 2], 6))
// 1, 2
// 4, 8, 11, 13, 14
//
// let nums = [1, 2, 3, 4, 7]
// let endPointList = [nums.length - 1]
// let array1: Number[] = []

// console.log(endPointList)
