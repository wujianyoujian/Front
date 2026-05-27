/*
 * @lc app=leetcode.cn id=102 lang=typescript
 *
 * [102] 二叉树的层序遍历
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

function levelOrder(root: TreeNode | null): number[][] {
  //   let queue = [];
  //   let result = [];
  //   if (root == null) {
  //     return [];
  //   }
  //   queue.push(root);
  //   while (queue.length) {
  //     let size = queue.length;
  //     let cur = [];
  //     for (let i = 0; i < size; i++) {
  //       let node: TreeNode = queue.shift();
  //       cur.push(node.val);
  //       if (node?.left) {
  //         queue.push(node?.left);
  //       }
  //       if (node?.right) {
  //         queue.push(node?.right);
  //       }
  //     }
  //     result.push(cur);
  //   }
  //   return result;
  let result: number[][] = [];
  function dfs(node: TreeNode | null, level: number) {
    if (node == null) {
      return;
    }
    if (!result[level]) {
      result[level] = [];
    }
    result[level].push(node.val);
    dfs(node.left, level + 1);
    dfs(node.right, level + 1);
  }
  dfs(root, 0);
  return result;
}
// @lc code=end
