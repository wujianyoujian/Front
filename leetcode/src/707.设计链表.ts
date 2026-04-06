/*
 * @lc app=leetcode.cn id=707 lang=typescript
 *
 * [707] 设计链表
 */

// @lc code=start
class MyLinkedList {
  val: number;
  next: MyLinkedList | null;

  constructor() {
    this.val = null;
    this.next = null;
  }

  get(index: number): number {
    let i = 0;
    let head: MyLinkedList = this;
    let num = null;
    while (head && i < index) {
      num = head.val;
      head = head.next;
      i++;
    }
    return num;
  }

  addAtHead(val: number): void {
    let tempPre = new MyLinkedList();
    tempPre.val = val;
    tempPre.next = this;
  }

  addAtTail(val: number): void {
    let node: MyLinkedList = this;
    let lastNode = new MyLinkedList();
    lastNode.val = val
    while (node) {
      if (!node.next) {
        node.next = lastNode;
        lastNode = null;
      }
      node = node.next;
    }
  }

  addAtIndex(index: number, val: number): void {}

  deleteAtIndex(index: number): void {}
}

/**
 * Your MyLinkedList object will be instantiated and called as such:
 * var obj = new MyLinkedList()
 * var param_1 = obj.get(index)
 * obj.addAtHead(val)
 * obj.addAtTail(val)
 * obj.addAtIndex(index,val)
 * obj.deleteAtIndex(index)
 */
// @lc code=end
