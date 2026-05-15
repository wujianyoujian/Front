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
- 3. `typeof` 和 `instanceof` 的区别？✅ 2026-05-11 59分

  **答：** typeof 检测基本类型，instanceof 通过原型链检测引用类型。

  **延伸 A：** myInstanceof 实现 → 不知道。标准答案：循环 Object.getPrototypeOf(obj) 向上找，对比是否等于 Constructor.prototype，到 null 返回 false。

  **延伸 B：** __proto__ vs Object.getPrototypeOf → 不知道。标准答案：前者非标准可写有安全隐患，后者是 ES5 正式 API 只读，null.__proto__ 报错而 Object.getPrototypeOf(null) 返回 null。
- 4. 如何判断一个变量是数组？✅ 2026-05-11 65分

  **答：** `Array.isArray([])`，或者 `Object.prototype.toString.call([])`

  **延伸 A：** `Object.prototype.toString.call(null)` 返回什么？ → 猜 null/undefined。标准答案：返回 `"[object Null]"`，ES5 规范对 null/undefined 做了特殊处理。

  **延伸 B：** 如何封装通用类型判断函数？ → 直接用就行。满分答案：`Object.prototype.toString.call(val).slice(8, -1).toLowerCase()` 去掉前后缀拿到类型名。
- 5. `==` 和 `===` 的区别？隐式类型转换规则？✅ 2026-05-11 78分

  **答：** == 会进行类型转换：有一方是数字则另一方转数字；有一方是布尔则布尔转数字；null == undefined 为 true，与其他类型比较为 false；引用类型先 toPrimitive（valueOf → toString）取原始值再比较。=== 类型不同直接 false，NaN !== NaN，+0 === -0。

  **延伸 A：** `[] == false` 推导 → [] toString ""，"" == false，布尔转0，"" == 0，字符串转0，0 == 0，true。✅

  **延伸 B：** `{} == false` 推导 → 误答 true。满分答案：{} toString "[object Object]"，转数字 NaN，NaN == 0 为 false。
- 6. `NaN` 是什么？如何判断一个值是 `NaN`？✅ 2026-05-11 62分

  **答：** 非数字类型，使用 `Number.isNaN()` 判断。

  **延伸 A：** `typeof NaN` 返回什么？ → 答 "NaN"（错）。满分答案：返回 `"number"`，NaN 是 IEEE 754 浮点数的特殊位模式，类型标签是 number。

  **延伸 B：** `Number.isNaN` 和 `Object.is(val, NaN)` 区别？ → 不知道。满分答案：效果相同，都不做类型转换；Object.is 是通用相等判断，还修复了 +0 === -0 的问题。

**变量与作用域**
- 7. `var`、`let`、`const` 的区别？✅ 2026-05-12 75分

  **答：** var 函数作用域，有变量提升（初始化为 undefined），可重复声明，挂到 window；let/const 块级作用域，有 TDZ，不可重复声明；const 基本类型不可修改，引用类型可修改内部属性但不能重新赋值。

  **延伸 A：** for 循环 var 经典问题 → setTimeout 回调共享同一个 var i，let 每次迭代创建独立块级作用域。✅

  **延伸 B：** TDZ 本质 → 不知道。满分答案：let/const 也会提升但初始化为 uninitialized 状态，访问时引擎检测到抛 ReferenceError；var 提升后直接初始化为 undefined 所以无 TDZ。
- 8. 什么是变量提升（hoisting）？函数提升和变量提升的优先级？✅ 2026-05-12 78分

  **答：** 引擎执行前将声明提升到作用域顶部，var 初始化为 undefined，let/const 标记为 uninitialized；函数声明整体提升，优先级高于 var。

  **延伸 A：** `typeof foo` 两次输出 → 答 function/function（错）。满分答案：第一次 "function"（函数提升），第二次 "number"（var foo = 1 赋值覆盖）。

  **延伸 B：** let 声明函数 vs function 声明提升差异 → let 有 TDZ，function 可在任意位置声明。满分答案补充：块内 function 在非严格模式有特殊规则，函数名提升到外层但初始化为 undefined，严格模式不泄漏。
- 9. 什么是暂时性死区（TDZ）？✅ 2026-05-12 80分

  **答：** let/const 声明会提升但标记为 uninitialized，从块级作用域开始到声明语句执行这段区域为 TDZ，访问会抛 ReferenceError（非 TypeError），目的是防止先用后声明的混乱。

  **延伸 A：** typeof 对 TDZ 变量也报错吗？ → 对。满分答案：typeof 未声明变量返回 "undefined" 安全；但 TDZ 内引擎知道变量存在（已提升），typeof 也抛 ReferenceError。

  **延伸 B：** 函数参数默认值有 TDZ？ → 没有（错）。满分答案：有，参数从左到右依次初始化，前面的参数引用后面未初始化的参数会报 ReferenceError。
- 10. 作用域链是什么？✅ 2026-05-12 72分

  **答：** 词法作用域在书写时确定，作用域链是变量查找的链式机制，当前作用域找不到沿 outer 指针向上查找直到全局，底层由词法环境/变量环境的 EnvironmentRecord 实现。

  **延伸 A：** 作用域链 vs 原型链 → 作用域链随执行上下文退栈，原型链不会变。满分答案补充：作用域链查变量/原型链查属性；scope chain 词法确定，prototype chain 运行时确定；找不到分别抛 ReferenceError 和返回 undefined。
- 11. 什么是闭包？闭包的应用场景和缺点？✅ 2026-05-12 68分

  **答：** 内部函数引用外部函数的变量，外部函数执行完返回内部函数时形成闭包，外部函数的词法环境不会被 GC 回收，可通过内部函数持续访问。应用场景：单例模式。缺点：内存泄漏。

  **延伸 A：** 闭包为什么会导致内存泄漏？举个具体场景，如何避免？ → 闭包容易造成大量变量对象未被 GC，造成内存消耗上升，比如处理页面绘制大量 DOM 节点的操作，及时销毁。 满分答案：闭包的 `[[Environment]]` 持有外部词法环境引用，只要闭包存活整个词法环境都不会被回收。典型场景：DOM 节点已从页面移除，但事件监听器的闭包仍引用该节点，导致节点无法被 GC。解决：`removeEventListener` 移除监听、将变量置 `null`、或用 `WeakRef`/`WeakMap` 持有对象。

  **延伸 B：** 用闭包实现带私有变量的计数器模块 → `function addCounter() { let count = 0; return { increment() { count++; }, getCount() { return count; } }; }` 解构后仍正确工作，因为两个方法的 `[[Environment]]` 指向同一词法环境，共享同一个 `count`。

---

## 函数

- 12. `call`、`apply`、`bind` 的区别？✅ 2026-05-13 59分

  **答：** call/apply 都是立即执行并改变 this 指向，call 传多个参数，apply 传数组；bind 返回新函数延迟执行，可预设部分参数，绑定后 this 不可被 call/apply 覆盖。

  **延伸 A：** bind 返回的函数用 new 调用时 this 指向谁？ → new 优先级更高，this 指向新实例，bind 绑定的 this 被忽略，但预设参数仍有效。规范实现：bound 内部检测 `this instanceof bound`，是则用新实例。

  **延伸 B：** 手写 call/apply/bind → 不会。满分答案：call/apply 用 Symbol 临时挂载到 context 上借用 this 调用；bind 返回 bound 函数，用 `this instanceof bound` 判断 new 调用，是则忽略绑定 this，合并 preArgs + args 传入原函数，bound.prototype = Object.create(fn.prototype) 保证 instanceof 正确。
- 13. 箭头函数和普通函数的区别？✅ 2026-05-13 62分

  **答：** 运行时 this 的指向问题，箭头函数中的 this 由外层决定，普通函数由当前调用决定。 满分答案：1. this 绑定：箭头函数没有自己的 this，捕获定义时外层的 this，call/apply/bind 无法改变；普通函数 this 由调用方式决定。2. arguments：箭头函数没有 arguments 对象，需用 rest 参数 ...args 替代。3. new：箭头函数不能作为构造函数，调用 new 会抛 TypeError，因为它没有 [[Construct]] 内部方法。4. prototype：箭头函数没有 prototype 属性。5. Generator：箭头函数不能用 function* 语法，不能 yield。

  **延伸 A：** obj.getArrow() 返回的箭头函数输出什么？obj.getDirect() 输出什么？ → arrow 输出 "obj"（getArrow 是普通函数，调用时 this 指向 obj，箭头函数捕获该 this），getDirect 输出 undefined（对象字面量不创建作用域，外层是全局/模块作用域，this 为 undefined）。

  **延伸 B：** React 类组件事件处理函数为什么要 bind(this) 或用箭头函数？ → 不知道。满分答案：JSX 里 onClick={this.handleClick} 是把方法引用赋值给事件处理器，触发时直接调用，this 丢失（严格模式下为 undefined），访问 this.setState 报错。解决：构造函数 bind、箭头函数类字段（handleClick = () => {}）、JSX 内联箭头函数（每次 render 创建新函数有性能问题）。
- 14. 什么是柯里化（currying）？手写实现？✅ 2026-05-14 59分

  **答：** 不知道。满分答案：把接受多个参数的函数转换为每次只接受一个参数、返回新函数的形式，直到参数收集够了再执行。用途：参数复用（固定部分参数生成新函数）、延迟执行、函数式编程组合。实现：用 fn.length 判断原函数需要几个参数，每次调用合并已收集参数，够了就执行，不够继续返回函数。`function curry(fn) { return function curried(...args) { if (args.length >= fn.length) return fn.apply(this, args); return function(...args2) { return curried.apply(this, args.concat(args2)); }; }; }`
- 15. 什么是函数防抖（debounce）和节流（throttle）？手写实现？✅ 2026-05-14 59分

  **答：** 写了防抖但没写节流，防抖代码有小 bug（fn.apply(this, ...args) 应为 fn.apply(this, args)），immediate 参数声明了但没用。满分答案：防抖是"等停下来再执行"，连续触发时不断重置定时器，只有 wait 时间内不再触发才执行，用于搜索框输入、窗口 resize。节流是"固定频率执行"，无论触发多频繁每 wait 时间最多执行一次，用于滚动加载、拖拽。

  **防抖完整实现：**
  ```js
  function debounce(fn, { wait = 300, immediate = false } = {}) {
    let timer = null;
    return function (...args) {
      const callNow = immediate && !timer;
      clearTimeout(timer);
      timer = setTimeout(() => {
        timer = null;
        if (!immediate) fn.apply(this, args);
      }, wait);
      if (callNow) fn.apply(this, args);
    };
  }
  ```

  **延伸 A：** 节流时间戳版实现 → 不知道。满分答案：
  ```js
  function throttle(fn, wait = 300) {
    let lastTime = 0;
    return function (...args) {
      const now = Date.now();
      if (now - lastTime >= wait) {
        lastTime = now;
        fn.apply(this, args);
      }
    };
  }
  ```
  时间戳版首次触发立即执行，停止触发后不会再执行。定时器版首次触发延迟执行，停止后还会执行最后一次。

  **延伸 B：** 防抖和节流的应用场景区别？ → 防抖用于搜索框输入（等用户停下来再请求）、窗口 resize（等调整完再重新布局）；节流用于滚动加载（固定频率检查是否到底）、拖拽（限制触发频率保证流畅）、按钮防重复点击。
- 16. 什么是纯函数？✅ 2026-05-14 70分

  **答：** 输入相同的参数，结果保持一致，不受外界的影响。满分答案：纯函数必须同时满足：1. 相同输入 → 相同输出（引用透明性），不依赖外部可变状态（全局变量、Date.now()、Math.random()）；2. 无副作用，不修改外部状态（参数、全局变量、DOM、发请求、console.log）。优点：可测试、可缓存、易并行、易推理。

  **延伸 A：** slice/splice/fetch 哪些是纯函数？ → 答 1 是 2 是 3 不是（错）。满分答案：1. slice 是（返回新数组无副作用），2. splice **不是**（修改原数组是副作用），3. fetch 不是（网络请求是副作用且结果不确定）。修改参数也算副作用，slice/map/filter 纯，splice/push/sort 不纯。

  **延伸 B：** React 为什么强调组件纯函数？不纯会导致什么问题？ → 不知道。满分答案：React 组件是 props + state → UI 的映射，要求相同输入相同输出、渲染无副作用。不纯导致：1. 并发渲染错乱（渲染可能中断重试，副作用重复执行）；2. StrictMode 双重调用失效；3. React.memo/useMemo 优化失效；4. 时间切片不可预测。副作用应放 useEffect/事件处理器，渲染逻辑只做纯计算。
- 17. 立即执行函数（IIFE）的作用？✅ 2026-05-14 59分

  **答：** 不知道。满分答案：创建独立作用域避免变量污染全局（ES6 前无块级作用域）、模块化封装暴露公共 API 隐藏私有变量、避免变量提升副作用。ES6 有 let/const + ES Module 后基本被替代。

  **延伸：** IIFE 为什么要用括号包裹？ → 不知道。满分答案：JS 解析器看到 function 开头认为是函数声明，声明不能直接调用会报 SyntaxError；括号让其变成函数表达式，表达式可立即调用。`!`、`+`、`void` 等一元运算符也能触发表达式模式。

- 18. 函数的 `arguments` 对象和 rest 参数的区别？✅ 2026-05-14 65分

  **答：** arguments 是实参，rest 是剩余参数。满分答案：1. 类型：arguments 是类数组对象不能直接用数组方法，rest 是真数组；2. 箭头函数没有 arguments，有 rest；3. 范围：arguments 收集所有实参，rest 只收集未命名的剩余参数；4. 非严格模式下 arguments 与形参联动（修改一个另一个跟着变），严格模式断开，rest 无此问题。

  **延伸：** arguments 非严格模式联动 → 不清楚。满分答案：非严格模式下 arguments 与具名形参共享同一值，修改 a 则 arguments[0] 也变，反之亦然；严格模式两者独立，这是 arguments 被废弃的原因之一。

---

## 原型与继承

- 19. 什么是原型链？✅ 2026-05-14 65分

  **答：** 所有对象都有 __proto__ 指向原型对象，访问属性时沿链向上查找。满分答案：每个对象有 [[Prototype]]（__proto__）指向原型，访问属性先找自身，找不到沿 __proto__ 向上直到 Object.prototype.__proto__ === null，找不到返回 undefined。

  **延伸 A：** new 时 __proto__ 指向构造函数的 prototype → 正确。new 四步：创建空对象、__proto__ 指向 Constructor.prototype、以新对象为 this 执行构造函数、返回对象（显式 return 对象则用它，否则返回新对象）。

  **延伸 B：** Object.prototype 上有哪些方法？为什么所有对象能调用 toString？ → 核心对但表达不精确。满分答案：所有对象原型链终点是 Object.prototype（其 __proto__ 为 null），继承其上的 toString/valueOf/hasOwnProperty/isPrototypeOf/propertyIsEnumerable 等方法。
- 20. `prototype` 和 `__proto__` 的区别？✅ 2026-05-14 78分

  **答：** prototype 是函数上的属性，__proto__ 是对象上的。满分答案：prototype 只有函数有，new 时实例的 __proto__ 指向它；__proto__ 所有对象都有（含函数），是实际的原型链指针，函数的 __proto__ 指向 Function.prototype；__proto__ 非标准，生产代码用 Object.getPrototypeOf() 替代。

  **延伸：** Foo.prototype.constructor 指向谁？何时丢失？ → 指向 Foo，重写 prototype 继承时丢失，需手动修复 Dog.prototype.constructor = Dog。ES6 class extends 自动处理，无需手动修复。
- 21. `new` 操作符做了什么？手写实现？✅ 2026-05-14 70分

  **答：** 1. 创建空对象，__proto__ 指向构造函数 prototype；2. 执行构造函数，this 指向新对象；3. 返回新对象。满分答案补充第 4 步：若构造函数显式 return 对象则返回该对象，return 基本类型则忽略返回新对象。`function myNew(Ctor, ...args) { const obj = Object.create(Ctor.prototype); const result = Ctor.apply(obj, args); return result instanceof Object ? result : obj; }`

  **延伸：** new 箭头函数为何报错？ → 箭头函数没有自己的 this。满分答案：根本原因是箭头函数没有 [[Construct]] 内部方法，new 本质调用 [[Construct]]，箭头函数缺失直接抛 TypeError；同时箭头函数无 prototype 属性，无法设置实例的 __proto__。
- 22. JS 实现继承的几种方式？各自的优缺点？✅ 2026-05-15 59分

  **答：** 不知道。满分答案：1. 原型链继承：Child.prototype = new Parent()，缺点引用类型共享、不能传参；2. 借用构造函数：Parent.call(this)，缺点无法复用父类原型方法；3. 组合继承：call + Object.create，缺点父类构造函数调用两次；4. 寄生组合继承：Object.create(Parent.prototype) + call，只调用一次父类构造函数，是最优方案也是 class extends 底层实现；5. ES6 class extends：语法简洁，底层是寄生组合继承。
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
