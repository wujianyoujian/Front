/*
 * @lc app=leetcode.cn id=429 lang=typescript
 *
 * [429] N 叉树的层序遍历
 */

// @lc code=start
/**
 * Definition for _Node.
 * class _Node {
 *     val: number
 *     children: _Node[]
 *
 *     constructor(v: number) {
 *         this.val = v;
 *         this.children = [];
 *     }
 * }
 */

function levelOrder(root: _Node | null): number[][] {
  let queue = [];
  let result: number[][] = [];
  queue.push(root);

  if (root == null) {
    return [];
  }

  while (queue.length > 0) {
    let temp = [];
    let size = queue.length;

    for (let i = 0; i < size; i++) {
      let node = queue.shift();
      temp.push(node.val);
      if (node?.children?.length) {
        queue.push(...node.children);
      }
    }
    result.push(temp);
  }
  return result;
}
// @lc code=end
