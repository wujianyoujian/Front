/*
 * @lc app=leetcode.cn id=904 lang=typescript
 *
 * [904] 水果成篮
 */

// @lc code=start
function totalFruit(fruits: number[]): number {
  let lanzi = new Map<number, number>();
  let left = 0;
  let right = 0;
  let result = -1;

  while (right <= fruits.length - 1) {
    lanzi.set(fruits[right], (lanzi.get(fruits[right]) || 0) + 1);

    if (lanzi.size > 2) {
      if (lanzi.get(fruits[left]) === 1) {
        lanzi.delete(fruits[left]);
      } else {
        lanzi.set(fruits[left], lanzi.get(fruits[left])! - 1);
      }
      left++;
    }

    result = Math.max(result, right - left + 1);

    right++;
  }

  return result;
}
// @lc code=end

{
  const result = totalFruit([3, 3, 3, 1, 2, 1, 1, 2, 3, 3, 4]);
  console.log(result);
}
