/*
 * @lc app=leetcode.cn id=59 lang=typescript
 *
 * [59] 螺旋矩阵 II
 */

// @lc code=start
function generateMatrix(n: number): number[][] {
  let row = 0;
  let col = 0;
  let num = n * n;
  let index = 0;
  let result: Array<Array<number>> =  new Array(n).fill(0).map(() => new Array(n).fill(0))
  // let need = n;

  while (index < num) {
    // 从左到右
    for (; col < n - row - 1; col++) {
      result[row][col] = ++index;
    }
    for (; row < col; row++) {
      result[row][col] = ++index;
    }
    for (; col > n - row - 1; col--) {
      result[row][col] = ++index;
    }
    for (; row > col + 1 || index == n * n - 1; row--) {
      result[row][col] = ++index;
    }
    
  }
  return result;
}
// @lc code=end

generateMatrix(4);
