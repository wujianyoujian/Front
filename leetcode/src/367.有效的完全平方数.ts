/*
 * @lc app=leetcode.cn id=367 lang=typescript
 *
 * [367] 有效的完全平方数
 */

// @lc code=start
function isPerfectSquare(num: number): boolean {
  let left = 0;
  let right = num - 1;

  if (num === 1) {
    return true;
  }

  if (num === 0) {
    return true;
  }

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
