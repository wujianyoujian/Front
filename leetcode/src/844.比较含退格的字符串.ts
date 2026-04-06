/*
 * @lc app=leetcode.cn id=844 lang=typescript
 *
 * [844] 比较含退格的字符串
 */

// @lc code=start
function backspaceCompare(s: string, t: string): boolean {
  // let sBackSpace = 0
  // let tBackSpace = 0
  // let sIndex = s.length - 1;
  // let tIndex = t.length - 1;
  // while(sIndex >= 0 || tIndex >= 0) {
  //   while(sIndex >= 0) {
  //     if (s[sIndex] === '#') {
  //       sBackSpace ++;
  //       sIndex--;
  //     } else if(sBackSpace > 0) {
  //       sBackSpace --;
  //       sIndex--;
  //     } else {
  //       break
  //     }
  //   }

  //   while(tIndex >= 0) {
  //     if (t[tIndex] === '#') {
  //       tBackSpace ++;
  //       tIndex--;
  //     } else if(tBackSpace > 0) {
  //       tBackSpace --;
  //       tIndex--;
  //     } else {
  //       break
  //     }
  //   }
  //   if (s[sIndex] !== t[tIndex]) {
  //     return false
  //   }
  //   sIndex --;
  //   tIndex --;
  // }
  // return true
  function getString(s: string) {
    let arr = [];
    for (let i = 0; i < s.length; i++) {
      if (s[i] !== '#') {
        arr.push(s[i]);
      } else if (arr.length > 0) {
        arr.pop();
      }
    }
    return arr.join();
  }

  return getString(s) === getString(t);
}
// @lc code=end
backspaceCompare('ab##', 'c#d#');
