/*
 * @lc app=leetcode.cn id=242 lang=typescript
 *
 * [242] 有效的字母异位词
 */

// @lc code=start
function isAnagram(s: string, t: string): boolean {
  let mapS = new Map();
  let mapT = new Map();

  if (s.length !== t.length) {
    return false;
  }
  for (let k of s) {
    mapS.set(k, (mapS.get(k) || 0) + 1);
  }

  for (let k of t) {
    mapT.set(k, (mapT.get(k) || 0) + 1);
  }
  console.log(mapS.keys());
  for (let k of mapS.keys()) {
    if (mapS.get(k) !== mapT.get(k)) {
      return false;
    }
  }
  return true;
}
// @lc code=end

{
  console.log(isAnagram("anagram", "nagaram"));
}
