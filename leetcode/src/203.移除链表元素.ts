/*
 * @lc app=leetcode.cn id=203 lang=typescript
 *
 * [203] 移除链表元素
 */

import ListNode, { createNodeList } from './practice/单链表';

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
  while (head && head.val === val) {
    head = head.next;
  }

  if (!head) {
    return head;
  }

  let pre = head;
  let cur = head.next;

  while (cur) {
    if (cur.val == val) {
      pre.next = cur.next;
    } else {
      pre = cur;
    }
    cur = cur.next;
  }
  return head;
}

// @lc code=end

let l3 = createNodeList([1, 2, 2, 1]);

removeElements(l3, 2);
