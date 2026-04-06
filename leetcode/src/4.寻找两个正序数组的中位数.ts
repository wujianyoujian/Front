/*
 * @lc app=leetcode.cn id=4 lang=typescript
 *
 * [4] 寻找两个正序数组的中位数
 */

// @lc code=start
function findMedianSortedArrays(nums1: number[], nums2: number[]): number {
  let result = nums1.concat(nums2)
  result.sort((a, b) => a - b)
  if (result.length % 2 === 0) {
    return (
      (result[Math.floor(result.length / 2) - 1] +
        result[Math.floor(result.length / 2)]) /
      2
    )
  } else {
    return result[Math.floor(result.length / 2)]
  }
}
// @lc code=end

console.log(findMedianSortedArrays([1, 3, 3, 9], [2, 4]))
