/*
 * @lc app=leetcode.cn id=3 lang=typescript
 *
 * [3] 无重复字符的最长子串
 */

// @lc code=start
function lengthOfLongestSubstring(s: string): number {
  let left = 0;
  let right = 0;
  let result: Array<string> = [];
  let result1 = 0;

  while (right < s.length) {
    
    result.push(s[right])

      while(result.slice(left, right).includes(result[right])) {
        left ++
      }
    result1 = Math.max(right - left + 1, result1)
    right ++;
  }
  return result1
};
// @lc code=end

lengthOfLongestSubstring('pwwkew')
