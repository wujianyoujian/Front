/*
 * @lc app=leetcode.cn id=76 lang=typescript
 *
 * [76] 最小覆盖子串
 */

// @lc code=start
function minWindow(s: string, t: string): string {
  function check(): boolean {
    if (sMap.size < tMap.size) {
      return false;
    }
    for (let i of tMap.keys()) {
      if (tMap.get(i) > (sMap.get(i) || 0)) {
        return false;
      }
    }
    return true;
  }

  let tMap = new Map<string, number>();
  let sMap = new Map<string, number>();

  let slowIndex = 0;
  let fastIndex = 0;
  let target = '';
  let targetLen = Infinity;

  for (let i of t) {
    if (tMap.has(i)) {
      tMap.set(i, tMap.get(i) + 1);
    } else {
      tMap.set(i, 1);
    }
  }

  while (fastIndex < s.length) {
    if (sMap.has(s[fastIndex])) {
      sMap.set(s[fastIndex], sMap.get(s[fastIndex]) + 1);
    } else {
      sMap.set(s[fastIndex], 1);
    }

    // 当前窗口满足条件
    while (check() && slowIndex <= fastIndex) {
      let currentLen = fastIndex - slowIndex + 1;
      if (targetLen > currentLen) {
        targetLen = currentLen;
        target = s.slice(slowIndex,  fastIndex + 1);
      }
      sMap.set(s[slowIndex], sMap.get(s[slowIndex]) - 1);
      slowIndex++;
    }

    fastIndex++;
  }

  return target;
}
// @lc code=end

minWindow('a', 'a');
