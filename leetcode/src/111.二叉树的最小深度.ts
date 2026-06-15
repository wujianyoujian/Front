/*
 * @lc app=leetcode.cn id=111 lang=typescript
 *
 * [111] 二叉树的最小深度
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

function minDepth(root: TreeNode | null): number {
  let queue = [];
  let depth = 0;
  if (root == null) {
    return 0;
  }
  queue.push(root);
  while (queue.length > 0) {
    const size = queue.length;
    depth++;
    for (let i = 0; i < size; i++) {
      const node = queue.shift();
      if (!node?.left && !node?.right) {
        return depth;
      }
      if (node?.left) queue.push(node.left);
      if (node?.right) queue.push(node.right);
    }
  }
  return depth;
}
// @lc code=end

{
  function test1() {
    while (true) {
      for (let i = 0; i < 10; i++) {
        if (i === 3) return i;
      }
    }
  }

  test1();
}
