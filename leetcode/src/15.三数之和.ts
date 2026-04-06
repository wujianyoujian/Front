/*
 * @lc app=leetcode.cn id=15 lang=typescript
 *
 * [15] 三数之和
 */

// @lc code=start
function threeSum(nums: number[]): number[][] {
  let target = 0
  let result = []
  nums = nums.sort((a, b) => a - b)
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] === nums[i - 1] && i > 0) {
      continue
    }
    let left = i + 1
    let right = nums.length - 1
    while (left < right) {
      if (nums[left] + nums[right] + nums[i] === target) {
        result.push([nums[i], nums[left], nums[right]])
        left++
        right--
      } else if (nums[left] + nums[right] + nums[i] > target) {
        right--
      } else if (nums[left] + nums[right] + nums[i] < target) {
        left++
      }
    }
  }
  return result
}
// @lc code=end

{
  let arr = [-1, 0, 1, 2, -1, -4, -2, -3, 3, 0, 4]
  console.log(threeSum(arr))
}
