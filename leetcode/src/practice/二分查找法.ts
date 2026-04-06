{
  let arr = [1, 2, 4, 5, 10, 22, 34, 45, 65]

  // 二分查找法
  function BinaryFind(arr: Array<number>, target: number) {
    let leftIndex = 0
    let rightIndex = arr.length - 1

    while (leftIndex <= rightIndex) {
      let middleIndex = Math.floor((leftIndex + rightIndex) / 2)

      if (target === arr[middleIndex]) {
        return middleIndex
      } else if (target < arr[middleIndex]) {
        rightIndex = middleIndex - 1
      } else if (target > arr[middleIndex]) {
        leftIndex = middleIndex + 1
      }
    }
  }

  // console.log(BinaryFind(arr, 22))
  console.log(BinaryFind(arr, 1))
  // console.log(BinaryFind(arr, 2))
  // console.log(BinaryFind(arr, 3))
  // console.log(BinaryFind(arr, 4))
  // console.log(BinaryFind(arr, 22))
}
