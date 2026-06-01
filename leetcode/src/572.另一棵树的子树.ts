/*
 * @lc app=leetcode.cn id=572 lang=typescript
 *
 * [572] 另一棵树的子树
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

function isSubtree(root: TreeNode | null, subRoot: TreeNode | null): boolean {
  function isCompare(left: TreeNode | null, right: TreeNode | null): boolean {
    if (left == null && right == null) return true;
    if (left == null || right == null) return false;
    if (left.val !== right.val) return false;

    return isCompare(left.left, right.left) && isCompare(left.right, right.right);
  }

  if (root == null) return false;
  if (isCompare(root, subRoot)) return true;
  return isSubtree(root.left, subRoot) || isSubtree(root.right, subRoot);
}
// @lc code=end
