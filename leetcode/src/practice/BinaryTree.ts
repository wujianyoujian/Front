(function () {
  class TreeNode {
    leftNode: TreeNode;
    rightNode: TreeNode;
    value: number = null;

    constructor(value: number) {
      this.value = value;
    }
  }

  function createBinaryTree(inputList: Array<number>) {
    if (!inputList || inputList.length === 0) {
      return;
    }
    let node: TreeNode = new TreeNode(null);
    let data = inputList.shift();
    if (data !== null) {
      node.value = data;
      node.leftNode = createBinaryTree(inputList);
      node.rightNode = createBinaryTree(inputList);
    }
    return node;
  }

  function preOrderTraveler(tree: TreeNode, result: Array<number>) {
    if (!tree) {
      return;
    }
    result.push(tree.value);
    preOrderTraveler(tree.leftNode, result);
    preOrderTraveler(tree.rightNode, result);

    return result;
  }

  function inOrderTraveler(tree: TreeNode) {}

  function postOrderTraveler(tree: TreeNode) {}

  function main() {
    let tree = createBinaryTree([
      3,
      2,
      9,
      null,
      null,
      10,
      null,
      null,
      8,
      null,
      4,
    ]);
    const result = preOrderTraveler(tree, []);
    console.log(result);
  }

  main();
})();
