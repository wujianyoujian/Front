/*
 * @lc app=leetcode.cn id=9 lang=typescript
 *
 * [9] 回文数
 */

// @lc code=start
function isPalindrome(x: number): boolean {
  if (x < 0) {
    return false;
  }
  let str = String(x);
  for (let i = 0, j = str.length - 1; i < str.length, j > 0; i++, j--) {
    if (str[i] !== str[j]) {
      return false;
    }
  }
  return true;
}
// @lc code=end
