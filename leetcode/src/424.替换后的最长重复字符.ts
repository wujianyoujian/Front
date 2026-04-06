/*
 * @lc app=leetcode.cn id=424 lang=typescript
 *
 * [424] 替换后的最长重复字符
 */

// @lc code=start
function characterReplacement(s: string, k: number): number {

  let slowIndex = 0;
  let fastIndex = 0;
  let maxCount = 0;
  let result = 0;
  let countKeyWord: Record<string, number> = {}
  while (fastIndex < s.length) {
    countKeyWord[s[fastIndex]] =  (countKeyWord[s[fastIndex]] || 0) + 1;

    if (countKeyWord[s[fastIndex]] > maxCount) {
      maxCount = countKeyWord[s[fastIndex]];
    }

    // 当前窗口的长度
    let windowLen = fastIndex - slowIndex  + 1
    // 只需要找到一次不满足就可以缩小
    if (windowLen - maxCount > k) {
      countKeyWord[s[slowIndex]] = countKeyWord[s[slowIndex]] - 1;
      slowIndex ++;
    } else {
      result = Math.max(result, windowLen)
    }
    fastIndex ++;
  }

  return result;
}
// @lc code=end

characterReplacement('AABABBA', 1);
