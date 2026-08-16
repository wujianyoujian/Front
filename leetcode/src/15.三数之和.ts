/*
 * @lc app=leetcode.cn id=15 lang=typescript
 *
 * [15] 三数之和
 */

// @lc code=start
function threeSum(nums: number[]): number[][] {
  // let result = [];
  // nums.sort((a, b) => a - b);

  // for (let i = 0; i < nums.length; i++) {
  //   let left = i + 1;
  //   let right = nums.length - 1;

  //   if (nums[i] === nums[i - 1] && i > 0) {
  //     continue;
  //   }

  //   while (left < right) {
  //     const sum = nums[i] + nums[left] + nums[right];

  //     if (sum === 0) {
  //       result.push([nums[i], nums[left], nums[right]]);
  //       left++;
  //       right--;
  //       while (left < right && nums[left] === nums[left - 1]) left++;
  //       while (left < right && nums[right] === nums[right + 1]) right--;
  //     } else if (sum > 0) {
  //       right--;
  //     } else if (sum < 0) {
  //       left++;
  //     }
  //   }
  // }

  // return result;

  let result = [];
  nums.sort((a, b) => a - b);

  for (let i = 0; i < nums.length; i++) {
    let left = i + 1;
    let right = nums.length - 1;

    if (nums[i] === nums[i - 1] && i > 0) {
      continue;
    }

    while (left < right) {
      const target = nums[i] + nums[left] + nums[right];
      if (target === 0) {
        result.push([nums[i], nums[left], nums[right]]);
        left++;
        right--;

        while (left < right && nums[left] === nums[left - 1]) left++;
        while (left < right && nums[right] === nums[right + 1]) right--;
      } else if (target > 0) {
        right--;
      } else {
        left++;
      }
    }
  }

  return result;
}
// @lc code=end

{
  let arr = [-1, 0, 1, 2, -1, -4, -2, -3, 3, 0, 4];
  console.log(threeSum(arr));
}
