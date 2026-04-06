/*
 * @lc app=leetcode.cn id=69 lang=typescript
 *
 * [69] x 的平方根
 */

// @lc code=start
function mySqrt(x: number): number {
  let left = 0;
  let right = x;
  let result = -1;

  if (x === 0) {
    return 0;
  }

  if (x === 1) {
    return 1;
  }

  while (left <= right) {
    let middle = left + ((right - left) >> 1);
    if (middle * middle <= x) {
      result = middle;
      left = middle + 1;
    } else {
      right = middle - 1;
    }
  }
  return Math.floor(result);
}
// @lc code=end
console.log(mySqrt(8));
// console.log(mySqrt(3));
// console.log(mySqrt(4));
// console.log(mySqrt(0));
