/*
 * @lc app=leetcode.cn id=24 lang=typescript
 *
 * [24] 两两交换链表中的节点
 */

// @lc code=start
/**
 * Definition for singly-linked list.
 * class ListNode {
 *     val: number
 *     next: ListNode | null
 *     constructor(val?: number, next?: ListNode | null) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.next = (next===undefined ? null : next)
 *     }
 * }
 */

function swapPairs(head: ListNode | null): ListNode | null {
  // 1 -> 2 -> 3 -> 4
  //

  const dummyNode = new ListNode(0);
  dummyNode.next = head;
  let cur = dummyNode;

  while (cur) {
    let temp = cur.next?.next?.next;
    

  }
}
// @lc code=end
