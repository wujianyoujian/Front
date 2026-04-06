/*
 * @lc app=leetcode.cn id=93 lang=typescript
 *
 * [93] 复原 IP 地址
 */

// @lc code=start
function restoreIpAddresses(s: string): string[] {
  function isRigthIP(str: string) {
    if (str.startsWith('0') && str.length > 1) {
      return false;
    }
    if (Number(str) > 255) {
      return false;
    }
    return true;
  }

  let result: any = [];
  let path: any = [];

  function recurrence(s: string, startIndex: number) {
    if (startIndex >= s.length && path.length === 4) {
      return result.push([...path]);
    }

    for (let i = startIndex; i < s.length; i++) {
      let temp = s.slice(startIndex, i + 1);
      if (isRigthIP(temp)) {
        path.push(temp);
      } else {
        continue;
      }
      recurrence(s, i + 1);
      path.pop();
    }
  }

  recurrence(s, 0);
  return result.map((item: Array<string>) => item.join('.'));
}
// @lc code=end

restoreIpAddresses('101023');
