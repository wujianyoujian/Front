/*
 * @lc app=leetcode.cn id=209 lang=typescript
 *
 * [209] 长度最小的子数组
 */

// @lc code=start
function minSubArrayLen(target: number, nums: number[]): number {
  // let result = Infinity;
  // let slowIndex = 0;
  // let fastIndex = 0;
  // while (slowIndex <= nums.length) {
  //   fastIndex = slowIndex;
  //   let num = 0;
  //   for (; fastIndex < nums.length; fastIndex++) {
  //     num = num + nums[fastIndex];
  //     if (num >= target) {
  //       result = fastIndex - slowIndex + 1 < result ? fastIndex - slowIndex + 1 : result;
  //       break;
  //     }
  //   }
  //   slowIndex++;
  // }
  // return result === Infinity ? 0 : result;
  // 以上代码测试超时
  // let slowIndex = 0;
  // let fastIndex = 0;
  // let num  = 0
  // let result = Infinity
  // for (; fastIndex < nums.length; fastIndex ++) {
  //   num = num + nums[fastIndex];
  //   while (num >= target) {
  //     result = Math.min(result, fastIndex - slowIndex + 1);
  //     num -= nums[slowIndex++];
  //   }
  // }
  // return result === Infinity ? 0 : result
  let slow = 0;
  let fast = 0;
  let result = Infinity;
  let sum = 0;

  for (; fast < nums.length; fast++) {
    sum += nums[fast];
    while (sum >= target) {
      result = Math.min(result, fast - slow + 1);
      sum -= nums[slow];
      slow++;
    }
  }
  return result;
}
// @lc code=end

minSubArrayLen(7, [2, 3, 1, 2, 4, 3]);
