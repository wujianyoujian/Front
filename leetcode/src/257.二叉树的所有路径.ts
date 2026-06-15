/*
 * @lc app=leetcode.cn id=257 lang=typescript
 *
 * [257] 二叉树的所有路径
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

function binaryTreePaths(root: TreeNode | null): string[] {
  let result: string[] = [];
  function travel(node: TreeNode | null, path: string) {
    if (node == null) {
      return;
    }
    path += node.val;
    if (node?.left == null && node?.right == null) {
      result.push(path);
    }
    travel(node?.left || null, path + "->");
    travel(node?.right || null, path + "->");
  }
  travel(root, "");
  return result;
}
// @lc code=end
