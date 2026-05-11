# JavaScript 面试题

## 基础概念

**数据类型**
- 1. JS 有哪些数据类型？基本类型和引用类型的区别？✅ 2026-05-11 00:00

  **答：** 基本类型：number、boolean、string、null、undefined、symbol、BigInt；引用类型：Object（含 Array、Function 等子类型）。基本类型值存栈，引用类型值存堆、指针存栈，赋值/复制传的是指针，容易出现两个变量指向同一对象的问题。

  **延伸 A：** `typeof null === 'object'` 是历史 bug，null 的内存表示全零，低 3 位与对象类型标签 000 相同，引擎误判。

  **延伸 B：** 基本类型可以调用方法是因为自动装箱（autoboxing），引擎临时创建对应的包装对象（如 String），调用完后立即销毁，所以对基本类型添加属性不会保留。


- 2. `null` 和 `undefined` 的区别？✅ 2026-05-11 59分

  **答：** null 表示主动赋值的空值，undefined 表示未初始化、函数无返回值、对象不存在的属性、未传入的参数。`==` 为 true，`===` 为 false。`typeof null` 为 `"object"`，`typeof undefined` 为 `"undefined"`。

  **延伸：** `null == undefined` 为 `true` 是 ECMAScript 规范的硬编码特殊处理，不走类型转换流程。设计动机是两者语义上都表示"没有值"，可用 `value == null` 同时检测两者。
- 3. `typeof` 和 `instanceof` 的区别？
- 4. 如何判断一个变量是数组？
- 5. `==` 和 `===` 的区别？隐式类型转换规则？
- 6. `NaN` 是什么？如何判断一个值是 `NaN`？

**变量与作用域**
- 7. `var`、`let`、`const` 的区别？
- 8. 什么是变量提升（hoisting）？函数提升和变量提升的优先级？
- 9. 什么是暂时性死区（TDZ）？
- 10. 作用域链是什么？
- 11. 什么是闭包？闭包的应用场景和缺点？

---

## 函数

- 12. `call`、`apply`、`bind` 的区别？
- 13. 箭头函数和普通函数的区别？
- 14. 什么是柯里化（currying）？手写实现？
- 15. 什么是函数防抖（debounce）和节流（throttle）？手写实现？
- 16. 什么是纯函数？
- 17. 立即执行函数（IIFE）的作用？
- 18. 函数的 `arguments` 对象和 rest 参数的区别？

---

## 原型与继承

- 19. 什么是原型链？
- 20. `prototype` 和 `__proto__` 的区别？
- 21. `new` 操作符做了什么？手写实现？
- 22. JS 实现继承的几种方式？各自的优缺点？
- 23. `Object.create()` 的作用？
- 24. `class` 语法糖和 ES5 构造函数的区别？

---

## 异步

- 25. 什么是事件循环（Event Loop）？
- 26. 宏任务（macrotask）和微任务（microtask）有哪些？执行顺序？
- 27. Promise 的三种状态？`then`、`catch`、`finally` 的用法？
- 28. 手写 Promise？
- 29. `Promise.all`、`Promise.race`、`Promise.allSettled`、`Promise.any` 的区别？
- 30. `async/await` 的原理？和 Promise 的关系？
- 31. 什么是回调地狱？如何解决？
- 32. `setTimeout(fn, 0)` 和 `Promise.resolve().then(fn)` 哪个先执行？

---

## ES6+

- 33. 解构赋值的用法？
- 34. 扩展运算符（`...`）的用法？
- 35. `Symbol` 是什么？有什么用途？
- 36. `Map` 和 `WeakMap` 的区别？`Set` 和 `WeakSet` 的区别？
- 37. `Map` 和普通对象的区别？
- 38. `Proxy` 和 `Reflect` 的用途？
- 39. 可选链（`?.`）和空值合并（`??`）操作符？
- 40. `for...in` 和 `for...of` 的区别？

---

## 对象与数组

- 41. 深拷贝和浅拷贝的区别？实现深拷贝的几种方式？
- 42. `Object.assign()` 是深拷贝还是浅拷贝？
- 43. 数组常用方法：`map`、`filter`、`reduce`、`flat`、`find`、`some`、`every`？
- 44. 如何数组去重？
- 45. `splice` 和 `slice` 的区别？
- 46. 对象的属性描述符（`Object.defineProperty`）？

---

## this

- 47. `this` 的指向规则？
- 48. 如何改变 `this` 的指向？
- 49. 箭头函数的 `this` 是什么？
- 50. 严格模式下 `this` 的变化？

---

## 内存与性能

- 51. 什么是垃圾回收？标记清除和引用计数？
- 52. 什么是内存泄漏？常见原因？
- 53. `WeakMap`/`WeakSet` 为什么能防止内存泄漏？

---

## 模块化

- 54. CommonJS 和 ES Module 的区别？
- 55. `require` 和 `import` 的区别？
- 56. ES Module 的静态分析是什么意思？
- 57. 循环依赖如何处理？

---

## 手写题（高频）

- 58. 手写 `instanceof`
- 59. 手写 `new`
- 60. 手写 `call` / `apply` / `bind`
- 61. 手写深拷贝
- 62. 手写防抖 / 节流
- 63. 手写 Promise
- 64. 手写 `Promise.all`
- 65. 手写柯里化
- 66. 手写 `flat`（数组扁平化）
- 67. 手写发布订阅模式
- 68. 手写 `Object.create`

---

## 其他

- 69. `0.1 + 0.2 !== 0.3` 的原因？如何解决？
- 70. `JSON.stringify` 的局限性？
- 71. `eval` 的危害？
- 72. 什么是尾调用优化？
- 73. `requestAnimationFrame` 和 `setTimeout` 的区别？
