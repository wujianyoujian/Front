/*
 * @lc app=leetcode.cn id=101 lang=typescript
 *
 * [101] 对称二叉树
 */

// @lc code=start
/**
 * Definition for a binary tree node.
 * class TreeNode {
 *     val: number
 *     left: TreeNode | null
 *     right: TreeNode | nullweus
 *     constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.left = (left===undefined ? null : left)
 *         this.right = (right===undefined ? null : right)
 *     }
 * }
 */

function isSymmetric(root: TreeNode | null): boolean {
  //   const queue: (TreeNode | null)[] = [root?.left ?? null, root?.right ?? null];
  //   while (queue.length > 0) {
  //     let left = queue.shift() ?? null;
  //     let right = queue.shift() ?? null;

  //     if (left == null && right == null) continue;
  //     if (left == null || right == null) return false;
  //     if (left.val !== right.val) return false;

  //     queue.push(left.left, right.right);
  //     queue.push(left.right, right.left);
  //   }

  //   return true;
  // function isCompare(left: TreeNode | null, right: TreeNode | null): boolean {
  //   if (left == null && right == null) return true;
  //   if (left == null || right == null) return false;
  //   if (left.val !== right.val) return false;
  //   return isCompare(left.left, right.right) && isCompare(left.right, right.left);
  // }

  // return isCompare(root?.left ?? null, root?.right ?? null);

  function isCompare(left: TreeNode | null, right: TreeNode | null): boolean {
    if (left == null && right == null) return true;
    if (left == null || right == null) return false;
    if (left.val !== right.val) return false;

    return isCompare(left.left, right.right) && isCompare(left.right, right.left);
  }
  return isCompare(root?.left || null, root?.right || null);
}
// @lc code=end
