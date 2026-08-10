/*
 * @lc app=leetcode.cn id=438 lang=typescript
 *
 * [438] 找到字符串中所有字母异位词
 */

// @lc code=start
function findAnagrams(s: string, p: string): number[] {
  const result: number[] = [];
  let sLength = s.length;
  let pLength = p.length;
  let need = new Map();
  let window = new Map();
  let left = 0;
  let right = 0;

  for (let c of p) {
    need.set(c, (need.get(c) || 0) + 1);
  }
  let needSize = need.size;
  let valide = 0;

  while (right < sLength) {
    let curChar = s[right];

    if (need.has(curChar)) {
      window.set(curChar, (window.get(curChar) || 0) + 1);
      if (window.get(curChar) === need.get(curChar)) valide++;
    }
    right++;

    while (right - left >= pLength) {
      if (needSize === valide) {
        result.push(left);
      }

      const deleteChar = s[left];
      left++;

      if (need.has(deleteChar)) {
        if (window.get(deleteChar) === need.get(deleteChar)) {
          valide--;
        }
        window.set(deleteChar, window.get(deleteChar) - 1);
      }
    }
  }

  return result;
}
// @lc code=end

findAnagrams("cbacebabacd", "abcc");
