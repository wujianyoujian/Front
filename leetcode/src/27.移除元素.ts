/*
 * @lc app=leetcode.cn id=27 lang=typescript
 *
 * [27] 移除元素
 */

// @lc code=start
function removeElement(nums: number[], val: number): number {
  // let count = 0
  // for (let i = 0; i < nums.length - count; i++) {
  //   if (nums[i] === val) {
  //     count++
  //     for (let j = i; j < nums.length - 1; j++) {
  //       nums[j] = nums[j + 1]
  //     }
  //     i--
  //   }
  // }
  // return nums.length - count
  // let fastIndex = 0
  // let slowIndex = 0
  // for (;fastIndex < nums.length; fastIndex ++) {
  //   if (nums[fastIndex] != val) {
  //     nums[slowIndex] = nums[fastIndex]
  //     slowIndex ++;
  //   }
  // }
  // return slowIndex

  let fastIndex = 0;
  let slowIndex = 0;

  for (; fastIndex < nums.length; fastIndex++) {
    if (val !== nums[fastIndex]) {
      nums[slowIndex] = nums[fastIndex];
      slowIndex++;
    }
  }
  return slowIndex;
}
// @lc code=end

removeElement([0, 1, 2, 2, 3, 0, 4, 2], 2);
// removeElement([3, 2, 2, 3], 3)
