/*
 * @lc app=leetcode.cn id=367 lang=typescript
 *
 * [367] 有效的完全平方数
 */

// @lc code=start
function isPerfectSquare(num: number): boolean {
  if (num === 1 || num === 0) {
    return true;
  }

  let left = 1;
  let right = num - 1;

  while (left <= right) {
    let middle = left + ((right - left) >> 1);

    if (middle * middle === num) {
      return true;
    } else if (middle * middle > num) {
      right = middle - 1;
    } else if (middle * middle < num) {
      left = middle + 1;
    }
  }
  return false;
}
// @lc code=end
console.log(isPerfectSquare(16));
console.log(isPerfectSquare(8));
console.log(isPerfectSquare(4));
