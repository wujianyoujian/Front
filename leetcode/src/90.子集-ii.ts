/*
 * @lc app=leetcode.cn id=90 lang=typescript
 *
 * [90] 子集 II
 */

// @lc code=start
function subsetsWithDup(nums: number[]): number[][] {
  let resut: any = [];
  let path: Array<number> = [];
  let usedList = nums.map(() => false);

  function recurrence(nums: Array<number>, startIndex: number, usedList: Array<boolean>) {
    resut.push([...path]);

    for (let i = startIndex; i < nums.length; i++) {
      if (i > 0 && nums[i] == nums[i - 1] && usedList[i - 1] == false) {
        continue;
      }
      usedList[i] = true;
      path.push(nums[i]);
      recurrence(nums, i + 1, usedList);
      usedList[i] = false;
      path.pop();
    }
  }

  nums = nums.sort();
  recurrence(nums, 0, usedList);

  return resut;
}
// @lc code=end

subsetsWithDup([1, 2, 2]);
