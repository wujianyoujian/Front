/*
 * @lc app=leetcode.cn id=26 lang=typescript
 *
 * [26] 删除有序数组中的重复项
 */

// @lc code=start
function removeDuplicates(nums: number[]): number {
  // let key = 1
  // nums.forEach((item, index) => {
  //   // if (index !== 0 && !nums.slice(0, index).includes(item)) {
  //   //   nums[key] = item
  //   //   key += 1
  //   // }
  //   if (index !== 0 && nums[index - 1] !== item) {
  //     nums[key] = item
  //     key += 1
  //   }
  // })
  // return nums.slice(0, key).length
  // let fastIndex = 0;
  // let slowIndex = 0;

  // for (; fastIndex < nums.length; fastIndex++) {
  //   if (nums[fastIndex] !== nums[slowIndex]) {
  //     slowIndex++;
  //     nums[slowIndex] = nums[fastIndex];
  //   }
  // }
  // return slowIndex + 1;

  let slowIndex = 0;
  let fastIndex = 0;

  for (; fastIndex < nums.length; fastIndex++) {
    if (nums[fastIndex] != nums[slowIndex]) {
      slowIndex++;
      nums[slowIndex] = nums[fastIndex];
    }
  }
  return slowIndex + 1;
}

// @lc code=end

{
  let result = removeDuplicates([0, 1, 1, 1, 1, 2, 2, 3, 3, 4]);
  console.log(result);
}
