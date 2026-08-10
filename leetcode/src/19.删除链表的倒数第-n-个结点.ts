/*
 * @lc app=leetcode.cn id=19 lang=typescript
 *
 * [19] 删除链表的倒数第 N 个结点
 */

import ListNode, { createNodeList } from "./practice/单链表";

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

function removeNthFromEnd(head: ListNode | null, n: number): ListNode | null {
  //   let size = 0;
  //   let cur = head;
  //   if (head?.next == null) {
  //     return null;
  //   }
  //   while (cur) {
  //     size++;
  //     cur = cur.next;
  //   }
  //   const index = size + 1 - n;
  //   const dummy = new ListNode();
  //   dummy.next = head;
  //   cur = dummy;
  //   let curIndex = 0;
  //   while (cur) {
  //     if (index - 1 === curIndex) {
  //       cur.next = cur.next?.next;
  //     } else {
  //       cur = cur.next;
  //     }
  //     curIndex++;
  //   }
  //   return dummy.next;
  // 双指针
  const dummy = new ListNode();
  dummy.next = head;
  let fast = dummy;
  let slow = dummy;
  for (let i = 0; i < n + 1; i++) {
    fast = fast?.next;
  }
  while (fast) {
    fast = fast.next;
    slow = slow?.next;
  }
  slow.next = slow.next?.next;

  return dummy.next;
}
// @lc code=end

const link = createNodeList([1, 2]);
removeNthFromEnd(link, 2);
