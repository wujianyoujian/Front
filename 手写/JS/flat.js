// function flat(arr = [], depth = 1) {
//   if (depth === 0) return arr.slice();
//   return arr.reduce((acc, cur) => {
//     if (Array.isArray(cur) && depth > 0) {
//       acc.push(...flat(cur, depth - 1));
//     } else {
//       acc.push(cur);
//     }
//     return acc;
//   }, []);
// }

function flat(arr = [], depth) {
  if (depth === 0) return arr;
  return arr.reduce((acc, cur) => {
    if (Array.isArray(cur) && depth > 0) {
      acc.push(...flat(cur, depth - 1));
    } else {
      acc.push(cur);
    }
    return acc;
  }, []);
}

function flatAll(arr) {
  while (arr.some(Array.isArray)) {
    arr = [].concat(...arr);
  }
  return arr;
}

// console.log(flatAll([[[2], [3, [4]]]]));

function flat1(arr = [], depth) {
  if (depth === 0) return arr;

  return arr.reduce((acc, cur) => {
    if (Array.isArray(cur) && depth > 0) {
      acc.push(...flat1(cur, depth - 1));
    } else {
      acc.push(cur);
    }
    return acc;
  }, []);
}

function flat2(arr = [], depth) {
  if (depth === 0) return arr;
  return arr.reduce((acc, cur) => {
    if (Array.isArray(cur) && depth > 0) {
      acc.push(...flat2(cur, depth - 1));
    } else {
      acc.push(cur);
    }
    return acc;
  }, []);
}

function flat3(arr, depth) {
  if (depth === 0) {
    return arr;
  }
  return arr.reduce((acc, cur) => {
    if (Array.isArray(cur) && depth > 1) {
      acc.push(...flat(cur, depth - 1));
    } else {
      acc.push(cur);
    }
    return acc;
  }, []);
}

console.log(flat3([[[2], [3, [4]]]], 3));
