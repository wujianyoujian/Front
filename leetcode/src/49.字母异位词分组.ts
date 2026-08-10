/*
 * @lc app=leetcode.cn id=49 lang=typescript
 *
 * [49] 字母异位词分组
 */

// @lc code=start
function groupAnagrams(strs: string[]): string[][] {
  let map = new Map();

  for (let s of strs) {
    const sroted = s.split("").sort().join("");
    if (!map.has(sroted)) {
      map.set(sroted, []);
    }
    map.get(sroted).push(s);
  }
  return [...map.values()];
  //   console.log(map);
}
// @lc code=end
groupAnagrams(["eat", "tea", "tan", "ate", "nat", "bat"]);
