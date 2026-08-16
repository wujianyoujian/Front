/*
 * @lc app=leetcode.cn id=23 lang=typescript
 *
 * [23] 合并 K 个升序链表
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

function mergeKLists(lists: Array<ListNode | null>): ListNode | null {
  function mergeList(list1: ListNode | null, list2: ListNode | null) {
    let dump = new ListNode(0);
    let cur = dump;

    while (list1 !== null && list2 !== null) {
      if (list1.val < list2.val) {
        cur.next = list1;
        list1 = list1.next;
      } else {
        cur.next = list2;
        list2 = list2.next;
      }
      cur = cur.next;
    }
    cur.next = list1 ?? list2;
    return dump.next;
  }
  let result = null;
  for (let i = 0; i < lists.length; i++) {
    result = mergeList(result, lists[i]);
  }
  return result;
}
// @lc code=end
