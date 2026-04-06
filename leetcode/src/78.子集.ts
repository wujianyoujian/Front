/*
 * @lc app=leetcode.cn id=78 lang=typescript
 *
 * [78] 子集
 */

// @lc code=start
function subsets(nums: number[]): number[][] {
  let resut: any = [];
  let path: any = [];

  function recurrence(startIndex: number) {
    // if (startIndex <= nums.length) {
    // return
    resut.push([...path]);
    // }

    for (let i = startIndex; i < nums.length; i++) {
      path.push(nums[i]);
      recurrence(i + 1);
      path.pop();
    }
  }

  recurrence(0);

  return resut;
}
// @lc code=end

subsets([0]);
