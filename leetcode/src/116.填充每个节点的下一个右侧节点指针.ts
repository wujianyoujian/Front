/*
 * @lc app=leetcode.cn id=116 lang=typescript
 *
 * [116] 填充每个节点的下一个右侧节点指针
 */

// @lc code=start
/**
 * Definition for _Node.
 * class _Node {
 *     val: number
 *     left: _Node | null
 *     right: _Node | null
 *     next: _Node | null
 *     constructor(val?: number, left?: _Node, right?: _Node, next?: _Node) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.left = (left===undefined ? null : left)
 *         this.right = (right===undefined ? null : right)
 *         this.next = (next===undefined ? null : next)
 *     }
 * }
 */

function connect(root: _Node | null): _Node | null {
  let queue = [];

  if (root == null) {
    return root;
  }
  queue.push(root);
  root.next = null;
  while (queue.length > 0) {
    let size = queue.length;
    for (let i = 0; i < size; i++) {
      let node: _Node = queue.shift();
      node.next = i < size - 1 ? queue[0] : null;
      if (node.left) {
        queue.push(node.left);
      }
      if (node.right) {
        queue.push(node.right);
      }
    }
    // for (let i = 0; i < queue.length; i++) {
    //   if (i < queue.length - 1) {
    //     queue[i].next = queue[i + 1];
    //   } else {
    //     queue[i].next = null;
    //   }
    // }
  }
  return root;
}
// @lc code=end
