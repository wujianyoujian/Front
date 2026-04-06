/*
 * @lc app=leetcode.cn id=349 lang=typescript
 *
 * [349] 两个数组的交集
 */

// @lc code=start
function intersection(nums1: number[], nums2: number[]): number[] {
  let result: any = []
  let tempMap: any = {}
  nums1.forEach((item, index) => {
    if (!tempMap[item]) {
      tempMap[item] = 0
    }
  })
  nums2.forEach((item, index) => {
    if (tempMap.hasOwnProperty(item)) {
      tempMap[item] ++
    }
  })
  Object.keys(tempMap).map(key => {
    if (tempMap[key] > 0) {
      result.push(Number(key))
    }
  })
  return result
};
// @lc code=end

{
  intersection([1,2,3,1], [2,2])
}

