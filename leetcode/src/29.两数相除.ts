/*
 * @lc app=leetcode.cn id=29 lang=typescript
 *
 * [29] 两数相除
 */

// @lc code=start
function divide(dividend: number, divisor: number): number {
  const INT_MAX = 2147483647;
  const INT_MIN = -2147483648;

  // 特判：除数为 0（题目不会出现，一般加上为安全）
  if (divisor === 0) return INT_MAX;

  // 特判：INT_MIN / -1 会溢出
  if (dividend === INT_MIN && divisor === -1) return INT_MAX;

  // 确定结果是否为负
  const negative = (dividend < 0) !== (divisor < 0);

  // 转成正数（注意使用 Math.abs 防止溢出）
  let a = Math.abs(dividend);
  let b = Math.abs(divisor);

  let result = 0;

  // 主循环
  while (a >= b) {
    let temp = b;
    let multiple = 1;

    // divisor 不断左移加速
    while (temp << 1 > 0 && temp << 1 <= a) {
      temp <<= 1;
      multiple <<= 1;
    }

    // 减掉最大倍数的 divisor
    a -= temp;

    // 累加倍数
    result += multiple;
  }

  // 加上符号
  result = negative ? -result : result;

  // 边界处理
  if (result < INT_MIN) return INT_MIN;
  if (result > INT_MAX) return INT_MAX;

  return result;
}
// @lc code=end

divide(43, 3);
