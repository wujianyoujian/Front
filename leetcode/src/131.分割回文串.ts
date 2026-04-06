/*
 * @lc app=leetcode.cn id=131 lang=typescript
 *
 * [131] 分割回文串
 */

// @lc code=start
function partition(s: string): string[][] {
  let path: any = [];
  let result: any = [];

  function isHuiWen(str: string) {
    for (let i = 0, j = str.length - 1; i < str.length, j >= 0; i++, j--) {
      if (str[i] !== str[j]) {
        return false;
      }
    }
    return true;
  }

  function recurrence(startIndex: number) {
    if (startIndex >= s.length) {
      return result.push([...path]);
    }

    for (let i = startIndex; i < s.length; i++) {
      // path.push(s[i])
      let temp = s.slice(startIndex, i + 1);
      if (isHuiWen(temp)) {
        path.push(temp);
      } else {
        continue;
      }
      recurrence(i + 1);
      path.pop();
    }
  }
  recurrence(0);

  return result;
}

// @lc code=end

partition('aba');
