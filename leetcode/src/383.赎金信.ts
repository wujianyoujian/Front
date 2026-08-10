/*
 * @lc app=leetcode.cn id=383 lang=typescript
 *
 * [383] 赎金信
 */

// @lc code=start
function canConstruct(ransomNote: string, magazine: string): boolean {
  let mapT = new Map();
  for (let k of magazine) {
    mapT.set(k, (mapT.get(k) || 0) + 1);
  }
  for (let k of ransomNote) {
    if (mapT.has(k) && mapT.get(k) > 0) {
      mapT.set(k, mapT.get(k) - 1);
    } else {
      return false;
    }
  }
  return true;
}
// @lc code=end
