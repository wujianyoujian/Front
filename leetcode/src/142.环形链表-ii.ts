/*
 * @lc app=leetcode.cn id=142 lang=typescript
 *
 * [142] 环形链表 II
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

function detectCycle(head: ListNode | null): ListNode | null {
  // 遍历
  //   let cur = head;
  //   let queue = [];
  //   while (cur) {
  //     let index = queue.find((x) => x === cur);
  //     if (index) {
  //       return index;
  //     }
  //     queue.push(cur);
  //     cur = cur.next;
  //   }
  //   return null;
  let fast = head;
  let slow = head;
  while (fast && fast.next) {
    fast = fast.next.next;
    slow = slow.next;
    if (fast == slow) {
      slow = head;
      while (slow !== fast) {
        slow = slow?.next;
        fast = fast?.next;
      }
      return slow;
    }
  }
  return null;
}
// @lc code=end
