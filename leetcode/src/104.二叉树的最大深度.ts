/*
 * @lc app=leetcode.cn id=104 lang=typescript
 *
 * [104] 二叉树的最大深度
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

function maxDepth(root: TreeNode | null): number {
  //   let result: number[][] = [];

  //   function dfs(node: TreeNode | null, depth: number) {
  //     if (node == null) {
  //       return;
  //     }
  //     if (!result[depth]) {
  //       result[depth] = [];
  //     }
  //     result[depth].push(node.val);
  //     dfs(node.left, depth + 1);
  //     dfs(node.right, depth + 1);
  //   }

  //   dfs(root, 0);
  //   return result.length;

  if (root === null) return 0;
  return Math.max(maxDepth(root.left), maxDepth(root.right)) + 1;
}
// @lc code=end
