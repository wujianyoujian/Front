/*
 * @lc app=leetcode.cn id=647 lang=typescript
 *
 * [647] 回文子串
 */

// @lc code=start
function countSubstrings(s: string): number {
  // aba
  let strList = [];
  let result = [];
  for (let i = 1; i <= s.length; i++) {
    for (let j = 0; j < s.length; j++) {
      let temp = s.slice(j, i)
      if (temp) {
        strList.push(temp);
      }
    }
  }
  function isHuiWen(str: string) {
    for (let i = 0, j = str.length - 1; i < str.length, j >=0; i ++, j--) {
      if (str[i] !== str[j]) {
        return false
      }
    }
    return true
  }

  for (let i = 0; i < strList.length; i ++) {
    if (isHuiWen(strList[i])) {
      result.push(strList[i])
    }
  }
  
  return result.length;
}

// @lc code=end

countSubstrings('aaabaaa');
// a
// a
// a
// aa
// aa
// aaa

// aba
// a
// b
// a
// ab
// ba
// aba
