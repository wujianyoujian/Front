/*
 * @lc app=leetcode.cn id=144 lang=typescript
 *
 * [144] 二叉树的前序遍历
 */

class TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
  constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
    this.val = val === undefined ? 0 : val;
    this.left = left === undefined ? null : left;
    this.right = right === undefined ? null : right;
  }
}

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

function preorderTraversal(root: TreeNode | null): number[] {
  // let result: Array<number> = [];

  // function recurrence(node: TreeNode | null, result: Array<number>) {
  //   if (!node) {
  //     return result;
  //   }
  //   result.push(node.val);
  //   recurrence(node.left, result);
  //   recurrence(node.right, result);
  //   return result;
  // }

  // return recurrence(root, result);
  let result: Array<number> = [];
  let stack = [];

  if ((root === null)) {
    return [];
  }
  stack.push(root);

  while (stack.length) {
    let node: TreeNode = stack.pop();
    result.push(node.val);
    if (node.right != null) {
      stack.push(node.right);
    }
    if (node.left != null) {
      stack.push(node.left);
    }
  }
  return result;
}
// @lc code=end
