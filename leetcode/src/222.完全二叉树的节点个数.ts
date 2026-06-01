/*
 * @lc app=leetcode.cn id=222 lang=typescript
 *
 * [222] 完全二叉树的节点个数
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

function countNodes(root: TreeNode | null): number {
  //   let nums = 0;
  //   function curry(node: TreeNode | null) {
  //     if (node == null) return;
  //     nums++;
  //     curry(node.left);
  //     curry(node.right);
  //   }
  //   curry(root);
  //   return nums;
  if (root == null) return 0;
  let leftNum = countNodes(root?.left);
  let rightNum = countNodes(root?.right);
  return leftNum + rightNum + 1;
}
// @lc code=end
