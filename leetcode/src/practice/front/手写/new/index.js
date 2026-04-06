window.onload = function () {};

function myNew(construcotrFn, ...args) {
  const newObj = Object.create(construcotrFn.prototype);
  // 这一步其实就是相当于把 函数中this -> newobj
  const result = construcotrFn.apply(newObj, args);
  return result instanceof Object ? result : newObj;
}

function Student(name, age) {
  this.age = age;
  this.name = name;
}

let s1 = myNew(Student, '12', 12)
console.log(s1.name)

