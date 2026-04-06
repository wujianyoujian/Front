/*
 * @lc app=leetcode.cn id=11 lang=typescript
 *
 * [11] 盛最多水的容器
 */

// @lc code=start
function maxArea(height: number[]): number {
  let leftIndex = 0
  let rightIndex = height.length - 1
  let maxAreaValue = 0
  while (leftIndex < rightIndex) {
    maxAreaValue = Math.max(
      maxAreaValue,
      Math.min(height[leftIndex], height[rightIndex]) * (rightIndex - leftIndex)
    )
    if (height[leftIndex] > height[rightIndex]) {
      rightIndex--
    } else {
      leftIndex++
    }
  }
  // return (area[0].index - area[1].index) * area[1].value
  return maxAreaValue
}
// @lc code=end
console.log(maxArea([1, 8, 6, 2, 5, 4, 8, 3, 7]))
