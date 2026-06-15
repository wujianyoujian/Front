/*
 * @lc app=leetcode.cn id=3 lang=typescript
 *
 * [3] 无重复字符的最长子串
 */

// @lc code=start
function lengthOfLongestSubstring(s: string): number {
  const map = new Map<string, number>();
  let left = 0;
  let right = 0;
  let result = 0;

  while (right < s.length) {
    const char = s[right];

    if (map.has(char) && map.get(char)! >= left) {
      left = map.get(char)! + 1;
    }

    map.set(char, right);
    result = Math.max(result, right - left + 1);
    right++;
  }
  return result;
}
// @lc code=end

lengthOfLongestSubstring("pwwkew");
