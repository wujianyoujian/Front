/*
 * @lc app=leetcode.cn id=160 lang=typescript
 *
 * [160] 相交链表
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

function getIntersectionNode(headA: ListNode | null, headB: ListNode | null): ListNode | null {
  //   let pa = headA;
  //   let pb = headB;
  //   while (pa !== pb) {
  //     pa = pa == null ? headB : pa.next;
  //     pb = pb == null ? headA : pb.next;
  //   }
  //   return pa;

  // hash 值解法
  let visitSet = new Set();
  let cur = headA;
  while (cur) {
    visitSet.add(cur);
    cur = cur.next;
  }
  cur = headB;
  while (cur) {
    if (visitSet.has(cur)) return cur;
    cur = cur.next;
  }
  return null;
}
// @lc code=end

// 1 -> 2 -> 4 -> 7 -> 10 -> 9 -> 4 -> 7 -> 10

// 9 -> 4 -> 7 -> 10 -> 1 -> 2 -> 4 -> 7 -> 10
