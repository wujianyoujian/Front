/*
 * @lc app=leetcode.cn id=110 lang=typescript
 *
 * [110] 平衡二叉树
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

function isBalanced(root: TreeNode | null): boolean {
  function height(node: TreeNode | null): number {
    if (node == null) return 0;

    let left = height(node.left);
    let right = height(node.right);

    if (left === -1) return -1;

    if (right === -1) return -1;

    if (Math.abs(left - right) > 1) return -1;

    return Math.max(left, right) + 1;
  }
  return height(root) !== -1;
}
// @lc code=end
