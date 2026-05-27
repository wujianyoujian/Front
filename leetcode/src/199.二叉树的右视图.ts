/*
 * @lc app=leetcode.cn id=199 lang=typescript
 *
 * [199] 二叉树的右视图
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

function rightSideView(root: TreeNode | null): number[] {
  let result: number[] = [];
  let temp: number[][] = [];
  function dfs(node: TreeNode | null, level: number) {
    if (node == null) {
      return null;
    }
    if (!temp[level]) {
      temp[level] = [];
    }
    temp[level].push(node.val);
    dfs(node.left, level + 1);
    dfs(node.right, level + 1);
  }
  dfs(root, 0);
  for (let i = 0; i < temp.length; i++) {
    result.push(temp[i][temp[i].length - 1]);
  }
  return result;
}
// @lc code=end
