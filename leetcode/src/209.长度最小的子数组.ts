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

  let slowIndex = 0;
  let fastIndex = 0;
  let num  = 0
  let result = Infinity
  for (; fastIndex < nums.length; fastIndex ++) {
    num = num + nums[fastIndex];
    
    while (num >= target) {
      result = Math.min(result, fastIndex - slowIndex + 1);
      num -= nums[slowIndex++];
    }
  }
  return result === Infinity ? 0 : result
}
// @lc code=end

minSubArrayLen(15, [1,1,1,1,1,1,1,1]);
