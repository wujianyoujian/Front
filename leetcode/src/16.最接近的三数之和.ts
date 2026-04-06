/*
 * @lc app=leetcode.cn id=16 lang=typescript
 *
 * [16] 最接近的三数之和
 */

// @lc code=start
function threeSumClosest(nums: number[], target: number): number {
  // 双指针
  // 最接近值
  nums = nums.sort((a, b) => a - b)
  let min = nums[0] + nums[1] + nums[2]
  for (let i = 0; i < nums.length; i++) {
    let left = i + 1
    let right = nums.length - 1
    while (left < right) {
      let temp = nums[i] + nums[left] + nums[right]
      if (Math.abs(temp - target) < Math.abs(min - target)) {
        min = temp
      }
      if (temp - target > 0) {
        right--
      } else if (temp - target < 0) {
        left++
      } else {
        return min
      }
    }
  }
  return min
}
// @lc code=end

{
  let arr = [0,1,2]
  let result = threeSumClosest(arr, 3)
  console.log(result)
}
