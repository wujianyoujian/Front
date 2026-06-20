/*
 * @lc app=leetcode.cn id=707 lang=typescript
 *
 * [707] 设计链表
 */
class ListNode {
  val: number;
  next: ListNode | null = null;

  constructor(val: number) {
    this.val = val;
    this.next = null;
  }
}
// @lc code=start

class MyLinkedList {
  head: ListNode | null = null;
  size: number = 0;

  constructor() {}

  get(index: number) {
    if (index < 0 || index >= this.size) {
      return -1;
    }
    let curIndex = 0;
    let cur: ListNode | null = this.head;
    while (cur) {
      if (curIndex === index) {
        return cur.val;
      }
      curIndex++;
      cur = cur.next;
    }
    return -1;
  }

  addAtHead(val: number) {
    const newHead = new ListNode(val);
    newHead.next = this.head;
    this.head = newHead;
    this.size++;
  }

  addAtTail(val: number) {
    const newNode = new ListNode(val);
    // 空链表：直接设为 head
    if (this.head === null) {
      this.head = newNode;
      this.size++;
      return;
    }
    let cur = this.head;
    while (cur.next) {
      cur = cur.next;
    }
    cur.next = newNode;
    this.size++;
  }

  addAtIndex(index: number, val: number) {
    // index 大于链表长度，不插入
    if (index > this.size) {
      return;
    }
    // index 等于链表长度，追加到末尾
    if (index === this.size) {
      this.addAtTail(val);
      return;
    }
    // index <= 0，插入头部
    if (index <= 0) {
      this.addAtHead(val);
      return;
    }

    const newNode = new ListNode(val);
    let curIndex = 0;
    let cur: ListNode | null = this.head;
    while (cur) {
      if (curIndex === index - 1) {
        newNode.next = cur.next;
        cur.next = newNode;
        this.size++;
        return;
      }
      curIndex++;
      cur = cur.next;
    }
  }

  deleteAtIndex(index: number) {
    // index 无效
    if (index < 0 || index >= this.size) {
      return;
    }
    // 删除头节点
    if (index === 0) {
      this.head = this.head!.next;
      this.size--;
      return;
    }
    let cur: ListNode | null = this.head;
    let curIndex = 0;
    while (cur) {
      if (curIndex === index - 1) {
        cur.next = cur.next!.next;
        this.size--;
        return;
      }
      curIndex++;
      cur = cur.next;
    }
  }
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
