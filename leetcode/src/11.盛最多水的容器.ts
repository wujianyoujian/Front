/*
 * @lc app=leetcode.cn id=11 lang=typescript
 *
 * [11] 盛最多水的容器
 */

// @lc code=start
function maxArea(height: number[]): number {
  let left = 0;
  let right = height.length - 1;
  let maxAreaValue = 0;
  while (left < right) {
    maxAreaValue = Math.max(maxAreaValue, Math.min(height[left], height[right]) * (right - left));

    if (height[left] > height[right]) {
      right--;
    } else {
      left++;
    }
  }
  return maxAreaValue;
}
// @lc code=end
console.log(maxArea([8, 7, 2, 1]));
