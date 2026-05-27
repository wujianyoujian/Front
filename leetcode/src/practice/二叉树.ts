{
  class TreeNode {
    leftNode: TreeNode;
    rightNode: TreeNode;
    value: number = 0;

    constructor(value: number) {
      this.value = value;
    }
  }

  // 根据前序创建二叉树
  function createBinaryTree(inputArray: Array<number>) {
    if (!inputArray || inputArray.length == 0) {
      return;
    }
    let curNode: TreeNode = new TreeNode(null);
    let data = inputArray.shift();
    if (data) {
      curNode.value = data;
      curNode.leftNode = createBinaryTree(inputArray);
      curNode.rightNode = createBinaryTree(inputArray);
    }

    return curNode;
  }

  // 根据二叉树 前序遍历

  function preOrderTraveler(tree: TreeNode, result: Array<number>) {
    if (!tree) {
      return;
    }
    result.push(tree.value);
    preOrderTraveler(tree.leftNode, result);
    preOrderTraveler(tree.rightNode, result);

    return result;
  }

  // 二叉树 前序迭代遍历
  function preOrderTraveler1(tree: TreeNode, result: Array<number>) {
    let stack = [tree];
    while (stack.length) {
      let node = stack.pop();
      result.push(node.value);
      if (node.rightNode) {
        stack.push(node.rightNode);
      }
      if (node.leftNode) {
        stack.push(node.leftNode);
      }
    }
    return result;
  }

  // 根据二叉树 迭代法
  function middleOrderTravel(tree: TreeNode, result: Array<number>) {
    let stack = [];
    let cur = tree;
    while (cur || stack.length) {
      if (cur) {
        stack.push(cur);
        cur = cur.leftNode;
      } else {
        cur = stack.pop();
        result.push(cur.value);
        cur = cur.rightNode;
      }
    }
    return result;
  }

  // 层序遍历, 迭代法
  function levelOrder(root: TreeNode) {
    let queue = [];
    let result = [];
    if (root == null) {
      return [];
    }
    queue.push(root);
    while (queue.length) {
      let size = queue.length;

      for (let i = 0; i < size; i++) {
        let node: TreeNode = queue.shift();
        result.push(node.value);
        if (node?.leftNode) {
          queue.push(node?.leftNode);
        }
        if (node?.rightNode) {
          queue.push(node?.rightNode);
        }
      }
    }
    return result
  }

  // 层序遍历，递归法
  function levelOrder1(root: TreeNode) {}

  let tree = createBinaryTree([3, 2, 9, null, null, 10, null, null, 8, null, 4]);
  const result = preOrderTraveler(tree, []);
  console.log(result);
  console.log(middleOrderTravel(tree, []));
}
