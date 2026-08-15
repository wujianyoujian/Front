{
  function diff(prevChildren, nextChildren) {
    const result = { reuses: [], moves: [], creates: [], deletes: [] };

    // ====== 第一轮：从头比 ======
    let i = 0;
    while (i < prevChildren.length && i < nextChildren.length) {
      if (prevChildren[i].key !== nextChildren[i].key) break;
      result.reuses.push({ node: prevChildren[i], newIndex: i, move: false });
      i++;
    }

    // ====== 第二轮：从尾比 ======
    let oldEnd = prevChildren.length - 1;
    let newEnd = nextChildren.length - 1;
    while (oldEnd >= i && newEnd >= i) {
      if (prevChildren[oldEnd].key !== nextChildren[newEnd].key) break;
      result.reuses.push({ node: prevChildren[oldEnd], newIndex: newEnd, move: false });
      oldEnd--;
      newEnd--;
    }

    // ====== 旧的没了，新的还有 → 全插入 ======
    if (i > oldEnd) {
      for (let j = i; j <= newEnd; j++) result.creates.push(nextChildren[j]);
      return result;
    }
    // ====== 新的没了，旧的还有 → 全删除 ======
    if (i > newEnd) {
      for (let j = i; j <= oldEnd; j++) result.deletes.push(prevChildren[j]);
      return result;
    }

    // ====== 第三轮：中间乱序部分 ======
    // 旧剩余 → Map
    const oldMap = new Map();
    for (let j = i; j <= oldEnd; j++) {
      oldMap.set(prevChildren[j].key, { node: prevChildren[j], oldIndex: j });
    }

    let lastPlacedIndex = 0;

    for (let j = i; j <= newEnd; j++) {
      const match = oldMap.get(nextChildren[j].key);

      if (match && match.node.type === nextChildren[j].type) {
        oldMap.delete(nextChildren[j].key);
        if (match.oldIndex >= lastPlacedIndex) {
          result.reuses.push({ node: match.node, newIndex: j, move: false });
          lastPlacedIndex = match.oldIndex;
        } else {
          result.moves.push({ node: match.node, newIndex: j });
        }
      } else {
        result.creates.push(nextChildren[j]);
      }
    }

    // Map 剩的 → 删除
    oldMap.forEach(({ node }) => result.deletes.push(node));

    return result;
  }

  // ─── 测试 ───
  const oldNodes = [
    { key: 'a', type: 'div' },
    { key: 'b', type: 'div' },
    { key: 'c', type: 'div' },
    { key: 'd', type: 'div' },
    { key: 'e', type: 'div' },
    { key: 'f', type: 'div' },
    { key: 'g', type: 'div' },
  ];

  const newNodes = [
    { key: 'a', type: 'div' },
    { key: 'b', type: 'div' },
    { key: 'e', type: 'div' },
    { key: 'c', type: 'div' },
    { key: 'd', type: 'div' },
    { key: 'i', type: 'div' },
    { key: 'g', type: 'div' },
  ];

  const r = diff(oldNodes, newNodes);
  console.log('复用(不移动):', r.reuses.map(v => v.node.key));  // a, b, g, e
  console.log('复用(需移动):', r.moves.map(v => v.node.key));   // c, d
  console.log('新建:', r.creates.map(v => v.key));              // i
  console.log('删除:', r.deletes.map(v => v.key));
}

{
  
}