/*
 * @lc app=leetcode.cn id=69 lang=typescript
 *
 * [69] x 的平方根
 */

// @lc code=start
function mySqrt(x: number): number {
  if (x <= 1) return x;

  let left = 1;
  let right = x;

  while (left <= right) {
    let middle = left + ((right - left) >> 1);
    if (middle * middle <= x) {
      left = middle + 1;
    } else {
      right = middle - 1;
    }
  }
  return right;
}
// @lc code=end
console.log(mySqrt(8));
// console.log(mySqrt(3));
// console.log(mySqrt(4));
// console.log(mySqrt(0));
