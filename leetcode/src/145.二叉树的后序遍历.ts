/*
 * @lc app=leetcode.cn id=145 lang=typescript
 *
 * [145] 二叉树的后序遍历
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

function postorderTraversal(root: TreeNode | null): number[] {
  let result: Array<number> = [];

  // function dfs(node: TreeNode | null) {
  //   if (node == null) {
  //     return;
  //   }
  //   dfs(node.left);
  //   dfs(node.right);
  //   result.push(node.val);
  // }
  // dfs(root);
  // return result;
  let stack = [];
  if (root == null) {
    return [];
  }
  stack.push(root);
  while (stack.length > 0) {
    let node = stack.pop();
    result.push(node?.val);
    if (node.left !== null) {
      stack.push(node.left);
    }
    if (node.right !== null) {
      stack.push(node.right);
    }
  }
  return result.reverse();
}
// @lc code=end
