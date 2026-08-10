/*
 * @lc app=leetcode.cn id=24 lang=typescript
 *
 * [24] 两两交换链表中的节点
 */

import { createNodeList } from "./practice/单链表";
class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val?: number, next?: ListNode | null) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
  }
}

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
  // const dummyNode = new ListNode(0);
  // dummyNode.next = head;
  // let cur: ListNode | null = dummyNode;
  // while (cur && cur.next && cur.next.next) {
  //   let temp: ListNode | null = cur.next!.next!.next;
  //   const next: ListNode | null = cur!.next;
  //   cur!.next = cur.next!.next;
  //   cur.next!.next = next;
  //   cur.next!.next!.next = temp;
  //   cur = cur.next!.next;
  // }
  // return dummyNode.next;

  // const dummy = new ListNode(0);
  // dummy.next = head;
  // let pre = dummy;

  // while (pre && pre.next && pre.next.next) {
  //   let first = pre.next;
  //   let second = first.next;

  //   first.next = second?.next;
  //   second.next = first;
  //   pre.next = second;

  //   pre = first;
  // }
  // return dummy.next;

  // 递归版

  if (head == null || head.next == null) {
    return head;
  }

  let first = head;
  let second = head.next;

  first.next = swapPairs(second.next);
  second.next = first;

  return second;
}
// @lc code=end
swapPairs(createNodeList([1, 2, 3, 4, 5, 7]));
