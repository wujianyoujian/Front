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

console.log(flatAll([[[2], [3, [4]]]]));
