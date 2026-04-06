// 单链表的定义
export default class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val?: number, next?: ListNode | null) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
  }
}

export function NodeListToArray(l: ListNode): Array<number> {
  let node = l;
  let arr = [];
  while (node) {
    arr.push(node.val);
    node = node.next;
  }
  return arr.reverse();
}

// 创建单链表
export function createNodeList(arr: Array<number>): ListNode {
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

export function get(index: number, linkList: ListNode): number {
  let i = 0;
  let head = linkList;
  let num = null;
  while (head && i < index) {
    num = head.val;
    head = head.next;
    i++;
  }
  return num;
}

export function addAtHead(val: number, l: ListNode): ListNode {
  let tempPre = new ListNode();
  tempPre.val = val;
  tempPre.next = l;
  return tempPre;
}

export function addAtTail(val: number, l: ListNode): ListNode {
  let node = l
  let lastNode = new ListNode(val)
  while(node) {
    if (!node.next) {
      node.next = lastNode
      lastNode = null
    }
    node = node.next
  }
  return l
}

export function addAtIndex(index: number, val: number, l: ListNode) {
  let newNode = new ListNode(val)
  let i = 1
  let cur = L.next
  while(cur) {
    if (cur.next && i == index -  1) {
      newNode.next = cur.next
      cur.next = newNode
    }
    cur = cur.next
    i++
  }
  return l
}

// test
let L = createNodeList([1, 2, 3, 4, 5]);
// get(3, L);

addAtIndex(3, 12, L);
