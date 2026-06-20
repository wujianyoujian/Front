/*
 * @lc app=leetcode.cn id=203 lang=typescript
 *
 * [203] 移除链表元素
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

function removeElements(head: ListNode | null, val: number): ListNode | null {
  // 移除 头部元素
  // while (head && head.val == val) {
  //   head = head.next;
  // }

  // let cur = head?.next;
  // let pre = head;

  // if (head == null) {
  //   return null;
  // }
  // while (cur) {
  //   // 1 -> 2 -> 3 -> 4
  //   // 2
  //   if (cur.val === val) {
  //     pre!.next = cur.next;
  //   } else {
  //     pre = cur;
  //   }
  //   cur = cur.next;
  // }
  // return head;
  // 伪造 虚拟头节点
  // let dummyNode = new ListNode();
  // dummyNode.next = head;
  // let cur: ListNode | null = dummyNode;
  // while (cur) {
  //   if (cur.next?.val == val) {
  //     cur.next = cur.next.next;
  //   } else {
  //     cur = cur.next;
  //   }
  // }
  // return dummyNode.next;

  // 递归
  if (head == null) {
    return null;
  }

  head.next = removeElements(head?.next, val);
  if (head?.val == val) {
    return head.next;
  }
  return head;
}

// @lc code=end

let l3 = createNodeList([1, 2, 2, 1]);

removeElements(l3, 2);
