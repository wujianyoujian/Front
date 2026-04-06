/*
 * @lc app=leetcode.cn id=17 lang=typescript
 *
 * [17] 电话号码的字母组合
 */

// @lc code=start
function letterCombinations(digits: string): string[] {
  const letterMap = [
    "",
    "",
    "abc",
    "def",
    "ghi",
    "jkl",
    "mno",
    "pqrs",
    "tuv",
    "wxyz",
  ]
  let path: any = []
  let result: any = []
  function recurrence(digits: string, index: number) {

    if (path.length == digits.length) {
      result.push([...path].join(''))
      return
    }

    let digit = parseInt(digits[index])
    let letter = letterMap[digit]
    for (let i = 0; i < letter.length; i++) {
      path.push(letter[i])
      recurrence(digits, index + 1)
      path.pop()
    }
  }

  if (!digits.length) {
    return result
  }

  recurrence(digits, 0)
  return result
};
// @lc code=end

letterCombinations('')

