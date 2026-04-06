/*
 * @lc app=leetcode.cn id=47 lang=typescript
 *
 * [47] 全排列 II
 */

// @lc code=start
function permuteUnique(nums: number[]): number[][] {
  let path: Array<number> = [];
  let result: Array<Array<number>> = [];
  let usedList: Array<boolean> = nums.map((item) => false);
  let needLength = nums.length;

  function recurrence(startIndex: number, nums: Array<number>, usedList: Array<boolean>) {
    if (path.length == needLength) {
      return result.push([...path]);
    }

    for (let i = startIndex; i < nums.length; i++) {
      // if (i > 0 && nums[i - 1] == nums[i] && usedList[i - 1] == false) {
      //   continue;
      // }

      if (usedList[i]) {
        continue;
      }

      usedList[i] = true;
      path.push(nums[i]);
      recurrence(0, nums, usedList);
      path.pop();
      usedList[i] = false;
    }
  }

  nums = nums.sort();
  recurrence(0, nums, usedList);
  return result;
}
// @lc code=end

permuteUnique([1, 2, 3, 5, 6, 7]);
