/*
 * @lc app=leetcode.cn id=2 lang=typescript
 *
 * [2] 两数相加
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
import ListNode, { NodeListToArray, createNodeList } from './practice/单链表';

function addTwoNumbers(l1: ListNode | null, l2: ListNode | null): ListNode | null {
  function NodeListToArray(l: ListNode): Array<number> {
    let node = l;
    let arr = [];
    while (node) {
      arr.push(node.val);
      node = node.next;
    }
    return arr.reverse();
  }

  function createNodeList(arr: Array<number>): ListNode {
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

  let arr1 = NodeListToArray(l1);
  let arr2 = NodeListToArray(l2);
  let moreArr;
  let lessArr;
  if (arr1.length > arr2.length) {
    moreArr = arr1;
    lessArr = arr2;
  } else {
    lessArr = arr1;
    moreArr = arr2;
  }

  let sgin = 0;
  let arr = [];
  for (let i = 0; i < moreArr.length; i++) {
    let t1 = moreArr[moreArr.length - i - 1];
    let t2 = lessArr[lessArr.length - i - 1] ?? 0;
    let temp = t1 + t2 + sgin;
    if (temp >= 10) {
      sgin = 1;
      arr.unshift(temp % 10);
    } else {
      sgin = 0;
      arr.unshift(temp);
    }
  }
  if (sgin === 1) {
    arr.unshift(1);
  }

  let result = createNodeList(arr.reverse());
  return result;
}
// @lc code=end

let l1 = createNodeList([2, 4, 3]);
let l2 = createNodeList([5, 6, 4]);
// NodeListToArray(l1);
addTwoNumbers(l1, l2);
