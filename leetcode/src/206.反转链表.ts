/*
 * @lc app=leetcode.cn id=206 lang=typescript
 *
 * [206] 反转链表
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

function reverseList(head: ListNode | null): ListNode | null {
  // 1. 迭代 1 -> 2 -> 3 -> null
  // null <- 1
  // let pre = null;
  // let cur = head;
  // while (cur) {
  //   const temp = cur.next;
  //   cur.next = pre;
  //   pre = cur;
  //   cur = temp;
  // }
  // return pre;
  // 2. 递归法
  // 1 -> 2 -> 3 -> 4 -> 5 -> null
  // if (head == null || head?.next == null) return head;
  // const newHead = reverseList(head.next);
  // head.next.next = head;
  // head.next = null;
  // return newHead;
  // 1 -> 2 -> 3 -> 4 -> 5 -> null
  // 1 -> null 2 -> 3
  // let pre = null;
  // let cur = head;
  // while (cur) {
  //   let temp = cur?.next;
  //   cur.next = pre;
  //   pre = cur;
  //   cur = temp;
  // }
  // return pre;
  // if (head == null || head.next == null) {
  //   return head;
  // }
  // const newHead = reverseList(head.next);
  // head.next.next = head;
  // head.next = null;
  // return newHead;
  // 1 -> 2 -> 3 -> 4

  // 1 -> null  2 -> 3 -> 4

  // null <- 1 <- 2  3 -> 4
  let pre = null;
  let cur = head;

  while (cur !== null) {
    let temp = cur.next;
    cur.next = pre;
    pre = cur;
    cur = temp;
  }
  return pre;
}
// @lc code=end

let l = createNodeList([1, 2, 3, 4, 5]);

console.log(reverseList(l));
