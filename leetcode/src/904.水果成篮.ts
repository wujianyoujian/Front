/*
 * @lc app=leetcode.cn id=904 lang=typescript
 *
 * [904] 水果成篮
 */

// @lc code=start
function totalFruit(fruits: number[]): number {
  // let hasFruitsSet: Array<number> = [];
  // let result = 0;
  // let left = 0;
  // let right = 0;
  // while (right < fruits.length) {
  //   if (!hasFruitsSet.includes(fruits[right])) {
  //     hasFruitsSet.push(fruits[right]);
  //   } else {
  //     if (hasFruitsSet.length === 2 && hasFruitsSet[1] != fruits[right]) {
  //       hasFruitsSet[0] = hasFruitsSet[1]
  //       hasFruitsSet[1] = fruits[right]
  //     }
  //   }
  //   if (hasFruitsSet.length > 2) {
  //     let leftValue = hasFruitsSet.shift();
  //     left = fruits.findIndex((item) => item == leftValue);
  //     for (let i = right; i >= left; i --) {
  //       if (fruits[i] === leftValue) {
  //         left = i + 1;
  //         break;
  //       }
  //     }
  //   }

  //   result = Math.max(right - left + 1, result);
  //   right++;
  // }
  // return result;
  const n = fruits.length;
  const fruitsMap = new Map();

  let left = 0,
    ans = 0;
  for (let right = 0; right < n; ++right) {
    fruitsMap.set(fruits[right], (fruitsMap.get(fruits[right]) || 0) + 1);
    while (fruitsMap.size > 2) {
      fruitsMap.set(fruits[left], fruitsMap.get(fruits[left]) - 1);
      if (fruitsMap.get(fruits[left]) == 0) {
        fruitsMap.delete(fruits[left]);
      }
      ++left;
    }
    ans = Math.max(ans, right - left + 1);
  }
  return ans;
}
// @lc code=end

totalFruit([0, 1, 6, 9, 6, 6, 9, 0]);
