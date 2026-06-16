/*
 * @lc app=leetcode.cn id=76 lang=typescript
 *
 * [76] 最小覆盖子串
 */

// @lc code=start
function minWindow(s: string, t: string): string {
  const need = new Map<string, number>();
  const window = new Map<string, number>();

  for (const char of t) {
    need.set(char, (need.get(char) || 0) + 1);
  }
}
// @lc code=end

minWindow("a", "a");
