/*
 * @lc app=leetcode.cn id=22 lang=typescript
 *
 * [22] 括号生成
 */

// @lc code=start
function generateParenthesis(n: number): string[] {
  let strList: any = [];
  let path: any = [];
  let result: any = [];

  for (let i = 0; i < n * 2; i++) {
    if (i <= n - 1) {
      strList.push('(');
    } else {
      strList.push(')');
    }
  }

  let usedList = strList.map(() => false);

  function isRightParenthesis(str: any) {
    let stack = [];
    for (let i = 0; i < str.length; i++) {
      if (str[i] === '(') {
        stack.push('(');
      } else {
        if (str[i] == ')' && stack[stack.length - 1] === '(') {
          stack.pop();
        } else {
          return false;
        }
      }
    }
    if (stack.length === 0) {
      return true;
    } else {
      return false;
    }
  }

  function recurrence(startIndex: number, usedList: Array<boolean>) {
    if (path.length === n * 2 && isRightParenthesis(path)) {
      return result.push([...path].join(''));
    }

    let aSet = new Set();
    for (let i = startIndex; i < strList.length; i++) {
      if (usedList[i] || aSet.has(strList[i])) {
        continue;
      }

      aSet.add(strList[i]);
      usedList[i] = true;
      path.push(strList[i]);
      recurrence(0, usedList);
      usedList[i] = false;
      path.pop();
    }
  }

  recurrence(0, usedList);

  return result;
}
// @lc code=end

// 排列组合问题，也就是判断是否为合法的括号
// ((()))
// (()))(

generateParenthesis(1);
