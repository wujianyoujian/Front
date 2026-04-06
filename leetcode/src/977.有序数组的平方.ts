/*
 * @lc app=leetcode.cn id=977 lang=typescript
 *
 * [977] 有序数组的平方
 */

// @lc code=start
function sortedSquares(nums: number[]): number[] {
  // return nums.map(item => Math.pow(item, 2)).sort((a, b) => a - b)
  let left = 0
  let right = nums.length - 1

  let result = []

  while(left <= right) {
    if (nums[left] * nums[left] > nums[right] * nums[right]) {
      result.unshift(nums[left] * nums[left])
      left ++;
    } else {
      result.unshift(nums[right] * nums[right])
      right --;
    }
  }

  {
    let arr: any = []
    function test() {

    }
  }

  return result
}
// @lc code=end

sortedSquares([-4,-1,0,3,10])
