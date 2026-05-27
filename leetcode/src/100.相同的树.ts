/*
 * @lc app=leetcode.cn id=100 lang=typescript
 *
 * [100] 相同的树
 */

// @lc code=start
/**
 * Definition for a binary tree node.
 * class TreeNode {
 *     val: number
 *     left: TreeNode | null
 *     right: TreeNode | null
 *     constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.left = (left===undefined ? null : left)
 *         this.right = (right===undefined ? null : right)
 *     }
 * }
 */

function isSameTree(p: TreeNode | null, q: TreeNode | null): boolean {
  //   let queue: (TreeNode | null)[] = [p, q];
  //   while (queue.length > 0) {
  //     let left = queue.shift();
  //     let right = queue.shift();

  //     if (left === null && right === null) continue;
  //     if (left == null || right == null) return false;
  //     if (left.val !== right.val) return false;

  //     queue.push(left.left, right.left);
  //     queue.push(left.right, right.right);
  //   }
  //   return true;
  function isCompare(left: TreeNode | null, right: TreeNode | null): boolean {
    if (left == null && right == null) return true;
    if (left == null || right === null) return false;
    if (left.val !== right.val) return false;

    return isCompare(left.left, right.left) && isCompare(left.right, right.right);
  }

  return isCompare(p, q);
}
// @lc code=end
