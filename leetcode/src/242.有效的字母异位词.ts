/*
 * @lc app=leetcode.cn id=242 lang=typescript
 *
 * [242] 有效的字母异位词
 */

// @lc code=start
function isAnagram(s: string, t: string): boolean {
  let sMap: any = {}
  let tMap: any = {}

  for (let i of s) {
    if (sMap[i]) {
      sMap[i] = sMap[i] + 1
    } else {
      sMap[i] = 1
    }
  }

  for (let i of t) {
    if (tMap[i]) {
      tMap[i] = tMap[i] + 1
    } else {
      tMap[i] = 1
    }
  }

  if (s.length !== t.length) {
    return false
  }

  if (Object.keys(sMap).every((key: string) => sMap[key] === tMap[key])) {
    return true
  }

  return false
}
// @lc code=end

{
  isAnagram('rat', 'car')
}
