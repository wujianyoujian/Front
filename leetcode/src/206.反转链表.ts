/*
 * @lc app=leetcode.cn id=206 lang=typescript
 *
 * [206] 反转链表
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

function reverseList(head: ListNode | null): ListNode | null {
  function NodeListToArray(l: ListNode): Array<number> {
    let node = l;
    let arr = [];
    if (!l) {
      return []
    }
    while (node) {
      arr.push(node.val);
      node = node.next;
    }
    return arr.reverse();
  }

  function createNodeList(arr: Array<number>): ListNode {
    if (arr.length === 0) {
      return null
    }
    let Head = new ListNode(arr[0]);
    let node = Head;
    let index = 0;
    while (index < arr.length - 1) {
      index++;
      node.next = new ListNode(arr[index]);
      node = node.next;
    }
    return Head;
  }
  const result = createNodeList(NodeListToArray(head))
  return result
}
// @lc code=end

let l = createNodeList([]);

reverseList(l)
