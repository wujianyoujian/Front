// 冒泡排序
const arr = [12, 3, 43, 2, 19, 98, 1, 0];
/**
 * 每一轮找到最大值，排到最后面
 * @param {Array<number>} arr
 * @returns
 */
function sort1(arr) {
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length - i - 1; j++) {
      let temp;
      if (arr[j] > arr[j + 1]) {
        temp = arr[j + 1];
        arr[j + 1] = arr[j];
        arr[j] = temp;
      }
    }
  }
  return arr;
}

function sort2(arr) {
  let isSorted = true;
  for (let i = 0; i < arr.length - 1; i++) {
    for (let j = 0; j < arr.length - i - 1; j++) {
      let temp;
      if (arr[j] > arr[j + 1]) {
        temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
        isSorted = false;
      }
    }
    if (isSorted) {
      break;
    }
  }
  return arr;
}

function quickSort(arr) {
  const length = arr.length;
  if (length === 0) {
    return arr;
  }
  const midIndex = Math.floor(length / 2);
  const midValue = arr.splice(midIndex, 1)[0];

  const left = [];
  const right = [];
  for (let i = 0; i < arr.length; i++) {
    const n = arr[i];
    if (n < midValue) {
      left.push(n);
    } else {
      right.push(n);
    }
  }
  return quickSort(left).concat([midValue], quickSort(right));
}


console.log(quickSort(arr));
