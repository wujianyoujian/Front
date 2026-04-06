// 回溯算法

let path: any = []
let result: any = []

function backtracking(n: number, k: number, startIndex: number) {
  if (path.length == k) {
    result.push([...path])
    return
  }

  for (let i = startIndex; i <= n - ( k - path.length) + 1; i ++) {
    path.push(i)
    backtracking(n, k, i + 1);
    path.pop()
  }
}

backtracking(3, 2, 1)
console.log(result)