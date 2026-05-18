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
- 23. `Object.create()` 的作用？✅ 2026-05-15 80分

  **答：** 以某个对象为原型创建新对象、配置属性描述符、创建无原型空对象。满分答案补充：第二个参数必须是属性描述符格式（value/writable/enumerable/configurable），不能直接写普通键值对。

  **延伸：** Object.create(null) vs {} 的使用场景？ → 场景不清晰。满分答案：Object.create(null) 用于纯字典/缓存对象，key 可能是 constructor/hasOwnProperty 等保留字时不会与原型冲突；for...in 遍历更安全不会枚举原型属性；Vue2 源码大量用于内部缓存。
- 24. `class` 语法糖和 ES5 构造函数的区别？✅ 2026-05-15 59分

  **答：** 不知道。满分答案：1. class 必须用 new 调用，直接调用抛 TypeError；ES5 构造函数可直接调用；2. class 原型方法 enumerable=false，for...in 不遍历；ES5 prototype 上的方法默认可枚举；3. class 没有变量提升，有 TDZ；function 声明整体提升；4. class 内部自动严格模式；5. 继承时 super() 必须在 this 之前调用，因为子类 this 由父类创建，super() 前 this 不存在；ES5 Parent.call(this) 可放任意位置。

---

## 异步

- 25. 什么是事件循环（Event Loop）？✅ 2026-05-15 75分

  **答：** JS 单线程，浏览器异步任务（定时器、网络请求、DOM 事件）分为微任务和宏任务，同步代码执行完后从任务队列取异步任务执行，循环往复。满分答案补充执行顺序：调用栈执行同步代码 → 清空所有微任务 → 取一个宏任务 → 再清空所有微任务 → 循环。同步代码在调用栈直接执行，不属于宏任务或微任务。

  **延伸：** 微任务：Promise.then/catch/finally、MutationObserver、queueMicrotask、async/await（await 后本质是 .then）。宏任务：setTimeout/setInterval、XHR/fetch 回调、DOM 事件回调、MessageChannel、setImmediate（Node.js）。
- 26. 宏任务（macrotask）和微任务（microtask）有哪些？执行顺序？✅ 2026-05-15 90分

  **答：** 宏任务：setTimeout/setInterval/XHR/DOM 回调；微任务：Promise/MutationObserver/queueMicrotask。执行顺序：同步代码 → 清空所有微任务 → 取一个宏任务 → 清空所有微任务 → 循环。

  **延伸：** 代码输出顺序 1 6 4 2 3 5 → 正确。推导：同步 1→6，微任务 4（注册宏任务5），宏任务 2（注册微任务3），微任务 3，宏任务 5。
- 27. Promise 的三种状态？`then`、`catch`、`finally` 的用法？✅ 2026-05-15 62分

  **答：** 成功/处理异常/无论成功与否执行一次。满分答案：三种状态：pending（等待）→ fulfilled（成功，触发 then）/ rejected（失败，触发 catch），状态单向不可逆。finally 不接收参数、不改变链的值，常用于关闭 loading/释放资源。

  **延伸：** then 第二参数 vs catch 区别 → 不知道。满分答案：then 第二参数只捕获当前 Promise 的错误，捕获不到 then 第一个回调里抛出的错误；catch 能捕获链上前面所有错误。实践中统一用链尾 .catch()，不用 then 第二参数。
- 28. 手写 Promise？✅ 2026-05-15 59分

  **答：** 写了基本框架：三态状态机、resolve/reject、回调数组、queueMicrotask 异步化、static resolve。有以下 bug：reject 里写 `this.value = value` 应为 `this.reason = reason`；then 里 rejected 状态传 `this.value` 应为 `this.reason`；pending 时 onRejected 回调未走 handle；onFulfilled/onRejected 未传时无默认值（值穿透缺失）。缺 catch/finally/static reject。finally 补充正确：`fn()` 不传参，用 `MyPromise1.resolve(fn()).then(() => value/throw reason)` 处理异步 fn 并透传值。满分答案：完整 Promise/A+ 实现需要：1. 状态守卫；2. executor try/catch；3. then 返回新 Promise；4. queueMicrotask 异步化；5. onFulfilled/onRejected 默认值实现值穿透；6. thenable 用 duck typing（检查 .then 是否为函数）而非 instanceof；7. catch = then(null, fn)；8. finally 等待 fn() 返回的 Promise settle 后透传原值/错误。

  **延伸 A：** 值穿透 → 不知道。满分答案：不传 onFulfilled 时默认 `v => v`，值原封不动 resolve 出去，下一个 then 能收到；不加默认值则 fn(val) 抛 TypeError 链断掉。

  **延伸 B：** instanceof 局限 → 不知道。满分答案：跨 iframe、跨库、多版本 bundle 时 instanceof 失效。规范（Promises/A+）用 duck typing：只要有 .then 方法就是 thenable，`typeof result.then === 'function'` 即可，与来源无关。
- 29. `Promise.all`、`Promise.race`、`Promise.allSettled`、`Promise.any` 的区别？✅ 2026-05-15 16:00 65分

  **答：** all 全部成功才成功，有一个失败就失败；race 有一个 settle 就结束（成功或失败都算）；allSettled 返回全部状态。漏掉 Promise.any。满分答案：all（全赢才赢）、race（第一个 settle 决定结果）、allSettled（全部落定永不 reject，返回 [{status,value/reason}]）、any（任一 fulfilled 就 fulfill，全部 rejected 才 reject 并抛 AggregateError）。

  **延伸 A：** Promise.all reject 后其余 Promise 继续执行，JS 无原生取消机制，可用 AbortController 取消 fetch。

  **延伸 B：** 手写 Promise.all → 思路正确（result[i] 保顺序、Promise.resolve 包裹、reject 透传），有三个 bug：Promise 前缺 new、count 用 const 不能 ++、空数组未处理。完整实现：`function myPromiseAll(promises) { return new Promise((resolve, reject) => { if (promises.length === 0) return resolve([]); let count = 0; const result = []; promises.forEach((p, i) => { Promise.resolve(p).then((value) => { result[i] = value; if (++count === promises.length) resolve(result); }, reject); }); }); }`
- 30. `async/await` 的原理？和 Promise 的关系？✅ 2026-05-15 16:10 59分

  **答：** 底层是语法糖，基于 Generator + yield 实现。满分答案：async/await 是 Generator + 自动执行器的语法糖。Generator 用 yield 暂停执行，自动执行器在 yield 的 Promise resolve 后自动调 .next() 恢复。async function 返回 Promise，await 等价于 yield Promise.resolve(expr)，await 后的代码本质是 .then() 回调在微任务队列执行。错误处理：await 的 Promise reject 抛异常，用 try/catch 捕获等价于 .catch()。底层完全是 Promise，只是让异步代码看起来像同步。
- 31. 什么是回调地狱？如何解决？✅ 2026-05-15 16:20 59分

  **答：** 不知道。满分答案：回调地狱是异步操作依赖嵌套回调，层层嵌套导致代码横向扩展，难以阅读维护和错误处理。解决方案：1. Promise 链式调用，把嵌套改为链式；2. async/await，让异步代码看起来像同步；3. Generator + 自动执行器（async/await 前身）。
- 32. `setTimeout(fn, 0)` 和 `Promise.resolve().then(fn)` 哪个先执行？✅ 2026-05-15 16:30 90分

  **答：** Promise.resolve().then(fn) 先执行。Promise.then 是微任务，同步代码执行完后立即清空微任务队列；setTimeout 是宏任务，微任务全部执行完才取宏任务执行。所以微任务永远先于宏任务。

---

## ES6+

- 33. 解构赋值的用法？✅ 2026-05-15 16:40 78分

  **答：** 数组解构 `[a, b] = arr`，对象解构 `{ name = 'default' } = obj`，可设默认值，注意目标为空时要加 `|| {}` 防报错。满分答案：1. 数组解构按位置，对象解构按 key；2. 默认值只在值为 undefined 时触发，null 不触发；3. 可用于函数参数 `function fn({ name, ...rest })`、变量交换 `[a, b] = [b, a]`、for...of 遍历、忽略某些值 `[,second] = arr`；4. 嵌套解构 `{ a: { b } } = obj`。
- 34. 扩展运算符（`...`）的用法？✅ 2026-05-15 59分

  **答：** 不知道。满分答案：两种用法：1. 展开（Spread）：把可迭代对象展开成独立元素，用于数组字面量 `[...a, 4]`、对象合并 `{...defaults, ...overrides}`、函数传参 `fn(...args)`；2. 收集（Rest）：把剩余参数收集成真数组，用于函数参数 `function fn(first, ...rest)` 和解构 `const [head, ...tail] = arr`、`const { a, ...others } = obj`。注意：对象展开是浅拷贝只复制可枚举自有属性，Rest 参数必须放最后，字符串也可展开 `[...'abc']` → `['a','b','c']`。
- 35. `Symbol` 是什么？有什么用途？✅ 2026-05-15 62分

  **答：** 作为唯一枚举值，可以传入字符串描述，描述相同的 Symbol 也不相等。满分答案：Symbol 是 ES6 新增的基本类型，每次调用 `Symbol()` 都返回唯一值，即使描述字符串相同。用途：1. 唯一 key：作为对象属性 key，`for...in`/`Object.keys()`/`JSON.stringify` 都枚举不到，适合定义"私有"属性或元数据；2. 常量枚举：替代字符串常量，避免值碰撞；3. Well-known Symbols：内置 Symbol 用于自定义对象行为，如 `Symbol.iterator`（自定义迭代）、`Symbol.toPrimitive`（自定义类型转换）、`Symbol.hasInstance`（自定义 instanceof）；4. `Symbol.for(key)` 全局注册表，相同 key 返回同一个 Symbol，跨模块共享。
- 36. `Map` 和 `WeakMap` 的区别？`Set` 和 `WeakSet` 的区别？✅ 2026-05-15 59分

  **答：** 不知道。满分答案：Map vs WeakMap：key 类型（任意 vs 只能对象）、引用类型（强引用 vs 弱引用，WeakMap 的 key 对象无其他引用时可被 GC）、可迭代性（Map 可遍历有 .size，WeakMap 不可遍历）；Set vs WeakSet：元素类型（任意 vs 只能对象）、引用类型（强 vs 弱）、可迭代性同上。Weak 版本核心价值：弱引用不阻止 GC，适合给对象附加私有数据（WeakMap）或标记对象是否处理过（WeakSet），避免内存泄漏。典型场景：WeakMap 给 DOM 节点附加缓存数据，节点移除后自动回收；WeakSet 标记已处理对象防重复执行。
- 37. `Map` 和普通对象的区别？✅ 2026-05-15 85分

  **答：** 对象 key 只能是字符串和 Symbol，插入顺序无规范保证，性能较慢；Map key 可以是任意类型，插入有序（规范保证），有专门性能优化。满分答案补充：1. 对象有原型链，key 可能与 constructor/hasOwnProperty/__proto__ 冲突，Map 无原型污染；2. Map 有 .size 属性，对象需 Object.keys().length；3. Map 可直接 for...of 迭代，对象需 Object.entries()；4. 选 Map 场景：key 是非字符串类型、频繁增删、需要 size、key 可能是保留字时。
- 38. `Proxy` 和 `Reflect` 的用途？✅ 2026-05-15 59分

  **答：** 不知道。满分答案：Proxy 拦截对象底层操作（get/set/delete/has 等），自定义对象行为，是 Vue3 响应式系统的基础。Reflect 把对象内置操作变成函数调用，与 Proxy trap 一一对应（Reflect.get/set/has 等）。Proxy 比 Object.defineProperty 的优势：1. 可拦截新增/删除属性，defineProperty 只能拦截已有属性；2. 可感知数组下标赋值和 .length 变化；3. 懒代理，访问时才递归，defineProperty 需提前遍历所有属性。Proxy 配合 Reflect 的原因：trap 里直接操作 target 会丢失 receiver，导致继承场景下 getter 里 this 指向错误，Reflect 传入 receiver 保证 this 正确。
- 39. 可选链（`?.`）和空值合并（`??`）操作符？✅ 2026-05-16 65分

  **答：** 获取不到值不会报错而是返回 undefined。满分答案：**可选链 `?.`**：`obj?.prop` / `obj?.[key]` / `fn?.()` 三种形式，左侧为 `null` 或 `undefined` 时短路返回 `undefined`，不抛错，只对 `null`/`undefined` 短路，`0`/`false`/`''` 不会短路。**空值合并 `??`**：左侧为 `null` 或 `undefined` 时返回右侧，否则返回左侧；与 `||` 的关键区别：`||` 左侧任何假值都走右侧，`??` 只有 `null`/`undefined` 才走右侧，避免 `0`/`false`/`''` 等合法值被错误替换为默认值。组合使用：`const name = user?.profile?.name ?? '匿名'`。

  **延伸：** 为什么只针对 `null`/`undefined` 而不是所有假值？ → 在提示后答出：`0`/`false`/`''` 是业务上合法的有意义的值，`||` 会错误地用默认值覆盖它们，`??` 语义更精确，只处理"真的没有值"的情况。
- 40. `for...in` 和 `for...of` 的区别？✅ 2026-05-16 59分

  **答：** 一个获取 key，一个获取 value。满分答案：`for...in` 遍历对象所有可枚举属性的 key，包括原型链上的属性，需配合 `hasOwnProperty` 过滤继承属性，适合普通对象不适合数组；`for...of` 遍历可迭代对象的 value，底层调用 `Symbol.iterator` 接口，内置可迭代对象有 Array/String/Map/Set/arguments/NodeList/Generator，普通对象未实现 `Symbol.iterator` 直接用会报 TypeError，需手动实现该接口才能迭代。

---

## 对象与数组

- 41. 深拷贝和浅拷贝的区别？实现深拷贝的几种方式？✅ 2026-05-16 75分

  **答：** 浅拷贝只复制最外层值，嵌套引用类型复制的是指针。满分答案：浅拷贝只复制第一层，嵌套引用类型共享同一份数据；深拷贝递归复制所有层级完全独立。浅拷贝实现：`Object.assign`/展开运算符/`arr.slice()`。深拷贝实现：1. `JSON.parse(JSON.stringify(obj))`；2. `structuredClone(obj)`（原生 API 推荐）；3. lodash `_.cloneDeep()`；4. 手写递归。

  **延伸：** `JSON.stringify` 局限性 → 函数/undefined/Symbol 丢失、循环引用报错、Map/Set 丢失类型。满分答案补充：Date 变字符串、NaN/Infinity 变 null、RegExp 变 `{}`。手写需用 WeakMap 处理循环引用，用 `Reflect.ownKeys` 含 Symbol key，单独处理 Date/RegExp/Map/Set，函数直接返回原引用。
- 42. `Object.assign()` 是深拷贝还是浅拷贝？✅ 2026-05-16 70分

  **答：** 浅拷贝。满分答案：`Object.assign` 只复制可枚举自有属性的第一层，嵌套引用类型共享指针，是浅拷贝。与展开运算符 `{...obj}` 的区别：`Object.assign` 赋值时触发目标对象的 setter，展开运算符直接定义属性绕过 setter；两者都调用源对象 getter 取值、都复制 Symbol key、都不复制原型属性。实际差异场景：Vue2 响应式对象中 `Object.assign` 到响应式对象会触发依赖更新，展开运算符创建新对象则不会。
- 43. 数组常用方法：`map`、`filter`、`reduce`、`flat`、`find`、`some`、`every`？✅ 2026-05-16 78分

  **答：** map 遍历返回新数组、filter 过滤、reduce 累加器、flat 展平、find 找第一个匹配、some 是否有一个满足、every 是否全部满足。满分答案补充：reduce 不传初始值时以第一个元素为初始 accumulator 从第二个开始迭代，空数组不传初始值报 TypeError，建议始终传初始值；reduce 常用于求和、数组转对象、统计次数、去重；flat 展平任意深度用 `arr.flat(Infinity)`。
- 44. 如何数组去重？✅ 2026-05-16 75分

  **答：** `[...new Set(arr)]`。满分答案：基本类型用 Set 最简洁；Set 对对象无效（按引用地址判断，内容相同的对象是不同引用）；对象数组按字段去重用 Map 记录已出现的 key 配合 filter；其他方式：`filter + indexOf`（保留第一个）、`reduce + includes`。
- 45. `splice` 和 `slice` 的区别？✅ 2026-05-16 88分

  **答：** splice 删除/替换元素修改原数组，slice 切分范围返回新数组不修改原数组。满分答案：splice(start, deleteCount, ...items) 三个参数，start 负数从末尾算，deleteCount 为 0 则只插入不删除，items 可多个；能做删除、插入、替换三种操作。slice(start, end) 返回 [start, end) 的新数组，负数索引支持，不修改原数组。
- 46. 对象的属性描述符（`Object.defineProperty`）？✅ 2026-05-16 72分

  **答：** 误答为 Proxy 拦截器。满分答案：`Object.defineProperty(obj, key, descriptor)` 用于精确控制属性行为。数据描述符：value（属性值）、writable（可写，false 赋值静默失败严格模式报错）、enumerable（可枚举，false 则 for...in/Object.keys 看不到）、configurable（可配置，false 则无法 delete 或重新 defineProperty）。访问器描述符：get/set 替代 value/writable，可拦截读写。默认值：直接赋值创建的属性三个标志都是 true，defineProperty 创建的默认都是 false。Vue2 响应式核心是用 setter 拦截赋值触发更新，无法感知新增属性是因为新增属性没有被 defineProperty 处理过。

---

## this

- 47. `this` 的指向规则？✅ 2026-05-16 82分

  **答：** 普通函数 this 指向调用方，全局调用是 globalThis（浏览器 window/Node global），对象方法调用指向对象，箭头函数捕获定义时外层 this。满分答案补充优先级（高→低）：new 绑定 > 显式绑定（call/apply/bind）> 隐式绑定（obj.fn()）> 默认绑定；箭头函数不参与这套规则，call/apply/bind/new 都无法改变其 this。
- 48. 如何改变 `this` 的指向？✅ 2026-05-16 80分

  **答：** call/apply/bind 显式绑定，箭头函数捕获外层 this。满分答案：1. call/apply/bind 显式指定；2. 箭头函数捕获外层 this；3. new 绑定到新实例；4. 对象方法调用隐式绑定；5. 赋值给变量再调用会丢失隐式绑定（obj.method 赋值给变量、传给回调、setTimeout 里调用都会丢失 this，变成 globalThis 或 undefined）。
- 49. 箭头函数的 `this` 是什么？✅ 2026-05-16 90分

  **答：** 箭头函数本身没有 this，指向定义时外层的 this。满分答案：箭头函数没有自己的 this，捕获定义时所在词法作用域的 this，call/apply/bind/new 都无法改变。定义在对象字面量里时外层 this 是 globalThis（严格模式/ES Module 下是 undefined），不是对象本身，因为对象字面量不创建新作用域。
- 50. 严格模式下 `this` 的变化？✅ 2026-05-16 72分

  **答：** 严格模式下普通函数直接调用 this 是 undefined。满分答案：1. 默认绑定：普通函数直接调用 this 是 undefined，非严格是 globalThis；2. 对象方法调用不变仍指向对象；3. call/apply/bind 传 null/undefined 时非严格替换为 globalThis，严格模式保持 null/undefined；4. 箭头函数不受影响。实际意义：防止意外污染全局，this 为 undefined 时访问属性直接报错，比静默失败更易发现 bug。

---

## 内存与性能

- 51. 什么是垃圾回收？标记清除和引用计数？✅ 2026-05-16 59分

  **答：** 不知道。满分答案：垃圾回收是 JS 引擎自动管理内存，定期找出不再使用的对象释放内存。引用计数：记录每个对象被引用次数，为 0 时回收，致命缺陷是循环引用永远无法回收（IE6/7 内存泄漏根源），现代引擎已不用。标记清除（现代主流）：从根节点（全局变量、调用栈）出发递归标记所有可达对象，未标记的统一清除，天然解决循环引用。V8 优化：分代回收（新生代频繁 GC + 老生代偶尔 GC）、增量标记（拆成小步骤避免长时间 Stop-the-World）、并发/并行 GC（后台多线程减少主线程阻塞）。
- 52. 什么是内存泄漏？常见原因？✅ 2026-05-16 78分

  **答：** 不再使用的对象仍被引用占用内存无法被 GC 回收，如大量 DOM 操作、事件监听未移除、闭包持有大对象。满分答案常见原因：1. 事件监听未移除（DOM 节点已移除但监听器还在）；2. 闭包持有大对象（整个词法环境不被回收）；3. 定时器未清除（setInterval 回调持有外部引用）；4. 全局变量意外创建（忘写 let/const 挂到 window）；5. 脱离 DOM 的节点引用（节点从页面移除但 JS 变量仍持有引用）。排查工具：Chrome DevTools Memory 面板堆快照对比。
- 53. `WeakMap`/`WeakSet` 为什么能防止内存泄漏？✅ 2026-05-16 70分

  **答：** 未被别处引用的会自动销毁。满分答案：WeakMap/WeakSet 持有弱引用，不计入 GC 引用计数，只要对象没有其他强引用即使还在 WeakMap 里也会被回收，对应条目自动消失。DOM 节点场景：普通 Map 强引用节点，节点从页面移除后 Map 仍持有引用导致泄漏；WeakMap 弱引用，节点无其他强引用时被 GC 回收，条目自动清理。WeakMap 不可遍历是因为 GC 随时可能回收 key，遍历结果不确定，规范直接禁止迭代且无 .size。适用场景：WeakMap 给对象附加私有数据/缓存；WeakSet 标记对象是否已处理防重复执行。

---

## 模块化

- 54. CommonJS 和 ES Module 的区别？✅ 2026-05-16 62分

  **答：** CommonJS 是 Node.js 模块化规范同步运行，ES Module 是 ES 规范。满分答案：1. 语法：require/module.exports vs import/export；2. 加载时机：运行时动态 vs 编译时静态分析（静态分析支持 Tree Shaking）；3. 加载方式：同步 vs 异步；4. 输出：值的拷贝 vs 实时绑定（live binding，原模块修改后导入方能看到最新值）；5. 顶层 this：module.exports vs undefined；6. 动态导入：CommonJS 可在条件语句里 require，ES Module import 必须在顶层，动态导入用 import()。
- 55. `require` 和 `import` 的区别？✅ 2026-05-17 59分

  **答：** 不知道。满分答案：本质是 CommonJS 和 ES Module 的区别。1. 语法：require 是函数调用，import 是关键字语句；2. 加载时机：require 运行时动态可写在条件语句，import 编译时静态必须在顶层；3. 同步/异步：require 同步阻塞，import 异步；4. 输出：require 值的拷贝，import 实时绑定；5. 动态导入：require 天然动态，import 动态导入用 import() 返回 Promise。
- 56. ES Module 的静态分析是什么意思？✅ 2026-05-17 80分

  **答：** import 语句静态分析哪些代码没用到，进行 Tree Shaking 减少打包体积。满分答案：import 必须在顶层不能在条件/函数里，打包工具在构建阶段就能确定模块依赖关系和具体导入项，形成完整依赖图。好处：1. Tree Shaking（删除未被导入的导出项）；2. 构建时检测循环依赖；3. 代码分割优化。CommonJS require 是运行时函数调用可动态拼路径，打包工具无法提前确定加载内容，只能整个模块打包，无法 Tree Shaking。
- 57. 循环依赖如何处理？✅ 2026-05-17 59分

  **答：** 不知道。满分答案：CommonJS 循环依赖时，已在加载中的模块直接返回当前已执行部分的 exports（未执行完的属性是 undefined），不会死循环但可能拿到不完整的值。ES Module 是实时绑定，但执行顺序问题同样可能拿到未初始化的值。避免方式：1. 把共用部分抽到第三个模块；2. 延迟引用（在函数内部 require，调用时再加载）；3. 用打包工具循环依赖检测插件提前发现。

---

## 手写题（高频）

- 58. 手写 `instanceof`✅ 2026-05-17 85分

  **答：** 写出了核心逻辑，边界判断略有瑕疵（把函数类型也排除了，但函数也能 instanceof）。满分答案：只需排除 null（Object.getPrototypeOf(null) 报错），然后循环 Object.getPrototypeOf 向上找，对比是否等于 Constructor.prototype，到 null 返回 false。
  ```js
  function myInstanceof(obj, Constructor) {
    if (obj == null) return false
    let proto = Object.getPrototypeOf(obj)
    while (proto !== null) {
      if (proto === Constructor.prototype) return true
      proto = Object.getPrototypeOf(proto)
    }
    return false
  }
  ```
- 59. 手写 `new`✅ 2026-05-17 95分

  **答：**
  ```js
  function myNew(constructor, ...args) {
    const obj = Object.create(constructor.prototype)
    const result = constructor.apply(obj, args)
    return result instanceof Object ? result : obj
  }
  ```
  三个关键点：Object.create 设置原型链、apply 以新对象为 this 执行构造函数、返回值判断（显式返回对象则用它否则返回新对象）。
- 60. 手写 `call` / `apply` / `bind`✅ 2026-05-17 78分

  **答：** 整体架构正确，有三个 bug：`new Symbol()` 应为 `Symbol()`（Symbol 不是构造函数）；bind 预设参数顺序反了应为 `[...preArgs, ...args]`；`bound.prototype = Object.getPrototypeOf(fn)` 应为 `Object.create(fn.prototype)`。满分答案：
  ```js
  Function.prototype.myCall = function (context, ...args) {
    context = context ?? globalThis
    const key = Symbol()
    context[key] = this
    const result = context[key](...args)
    delete context[key]
    return result
  }
  Function.prototype.myApply = function (context, args = []) {
    context = context ?? globalThis
    const key = Symbol()
    context[key] = this
    const result = context[key](...args)
    delete context[key]
    return result
  }
  Function.prototype.myBind = function (context, ...preArgs) {
    context = context ?? globalThis
    const fn = this
    function bound(...args) {
      return fn.apply(this instanceof bound ? this : context, [...preArgs, ...args])
    }
    bound.prototype = Object.create(fn.prototype)
    return bound
  }
  ```
- 61. 手写深拷贝✅ 2026-05-17 85分

  **答：** 结构完整，处理了 RegExp/Date/Map/Set/循环引用/Symbol key，两处漏传 map 参数和对象未先占位。满分答案：
  ```js
  function deepClone(val, map = new WeakMap()) {
    if (val == null || typeof val !== 'object') return val
    if (map.has(val)) return map.get(val)
    if (val instanceof RegExp) return new RegExp(val)
    if (val instanceof Date) return new Date(val)
    if (val instanceof Map) {
      const m = new Map()
      map.set(val, m)
      val.forEach((v, k) => m.set(deepClone(k, map), deepClone(v, map)))
      return m
    }
    if (val instanceof Set) {
      const s = new Set()
      map.set(val, s)
      val.forEach((v) => s.add(deepClone(v, map)))
      return s
    }
    const clone = Array.isArray(val) ? [] : {}
    map.set(val, clone)
    for (const key of Reflect.ownKeys(val)) {
      clone[key] = deepClone(val[key], map)
    }
    return clone
  }
  ```
- 62. 手写防抖 / 节流✅ 2026-05-17 92分

  **答：** 防抖两个小 bug（setTimeout 未传 wait、immediate 模式 timer 未重置）；节流写出了时间戳+定时器合并版最优实现。满分答案：
  ```js
  function debounce(fn, { wait = 300, immediate = false } = {}) {
    let timer = null
    return function (...args) {
      const canNow = immediate && !timer
      clearTimeout(timer)
      timer = setTimeout(() => {
        timer = null
        if (!immediate) fn.apply(this, args)
      }, wait)
      if (canNow) fn.apply(this, args)
    }
  }
  function throttle(fn, wait = 300) {
    let timer = null
    let lastTime = 0
    return function (...args) {
      const now = Date.now()
      const remainTime = wait - (now - lastTime)
      clearTimeout(timer)
      if (remainTime <= 0) {
        fn.apply(this, args)
        lastTime = now
      } else {
        timer = setTimeout(() => {
          lastTime = Date.now()
          fn.apply(this, args)
        }, remainTime)
      }
    }
  }
  ```
- 63. 手写 Promise✅ 2026-05-17 85分

  **答：** 核心架构正确（三态状态机、回调队列、queueMicrotask、值穿透、链式调用），三处 bug：static reject 参数写成 `(_, reject)` 应为 `((_, reject) => ...)`；instanceof 应改为 duck typing `typeof result?.then === 'function'`；onRejected 默认值应抛错 `v => { throw v }` 而非 `v => v`；缺 catch/finally。满分答案补充：`catch(fn) { return this.then(null, fn) }`；`finally(fn) { return this.then(value => MyPromise.resolve(fn()).then(() => value), reason => MyPromise.resolve(fn()).then(() => { throw reason })) }`。
- 64. 手写 `Promise.all`✅ 2026-05-17 90分

  **答：** 思路完整正确，一个笔误：`promises(...)` 应为 `promises.forEach(...)`。满分答案：
  ```js
  static all(promises) {
    return new MyPromise((resolve, reject) => {
      if (promises.length === 0) return resolve([])
      let count = 0
      const result = []
      promises.forEach((p, i) => {
        MyPromise.resolve(p).then((val) => {
          result[i] = val
          if (++count === promises.length) resolve(result)
        }, reject)
      })
    })
  }
  ```
- 65. 手写柯里化✅ 2026-05-17 95分

  **答：**
  ```js
  function curry(fn) {
    return function curried(...args1) {
      if (args1.length >= fn.length) return fn.apply(this, args1)
      return function (...args2) {
        return curried.apply(this, args1.concat(args2))
      }
    }
  }
  ```
- 66. 手写 `flat`（数组扁平化）✅ 2026-05-17 59分

  **答：** 不知道。满分答案：
  ```js
  function flat(arr, depth = 1) {
    if (depth === 0) return arr.slice()
    return arr.reduce((acc, cur) => {
      if (Array.isArray(cur) && depth > 0) {
        acc.push(...flat(cur, depth - 1))
      } else {
        acc.push(cur)
      }
      return acc
    }, [])
  }
  // 展平所有层：while + some
  function flatAll(arr) {
    while (arr.some(Array.isArray)) arr = [].concat(...arr)
    return arr
  }
  ```
- 67. 手写发布订阅模式✅ 2026-05-17 59分

  **答：** 不知道。满分答案：
  ```js
  class EventEmitter {
    constructor() {
      this.events = {}
    }
    on(event, fn) {
      if (!this.events[event]) this.events[event] = []
      this.events[event].push(fn)
      return this
    }
    emit(event, ...args) {
      const fns = this.events[event]
      if (!fns) return this
      fns.forEach(fn => fn(...args))
      return this
    }
    off(event, fn) {
      if (!this.events[event]) return this
      this.events[event] = this.events[event].filter(f => f !== fn)
      return this
    }
    once(event, fn) {
      const wrapper = (...args) => {
        fn(...args)
        this.off(event, wrapper)
      }
      this.on(event, wrapper)
      return this
    }
  }
  ```
- 68. 手写 `Object.create`✅ 2026-05-17 59分

  **答：** 不知道。满分答案：
  ```js
  function myCreate(proto) {
    if (proto === null) {
      const obj = {}
      Object.setPrototypeOf(obj, null)
      return obj
    }
    function F() {}
    F.prototype = proto
    return new F()
  }
  ```
  原理：创建空构造函数 F，把 F.prototype 设为目标原型，new F() 实例的 __proto__ 自动指向 F.prototype。

---

## 其他

- 69. `0.1 + 0.2 !== 0.3` 的原因？如何解决？✅ 2026-05-17 62分

  **答：** 数字精度存储问题，使用 BigNumber。满分答案：JS 数字使用 IEEE 754 双精度浮点数（64位）存储，0.1 和 0.2 用二进制表示是无限循环小数，存储时截断产生精度误差，两个误差相加不精确等于 0.3。解决：1. `Math.abs(0.1+0.2-0.3) < Number.EPSILON`（推荐）；2. `parseFloat((0.1+0.2).toFixed(10))`；3. 转整数计算再还原；4. decimal.js/big.js（金融场景）；5. 后端返回整数（分）前端除以 100 展示。
- 70. `JSON.stringify` 的局限性？✅ 2026-05-17 59分

  **答：** 不知道。满分答案：undefined/函数/Symbol 作为对象属性被忽略，作为数组元素变 null；NaN/Infinity 变 null；Date 变 ISO 字符串；RegExp/Map/Set 变 `{}`；循环引用和 BigInt 报 TypeError。自定义序列化：第二个参数 replacer 函数处理特殊值，或对象定义 toJSON 方法。
- 71. `eval` 的危害？✅ 2026-05-17 59分

  **答：** 不知道。满分答案：1. 安全风险：执行任意字符串代码，用户输入可触发 XSS；2. 性能差：无法被引擎提前优化，每次重新解析编译；3. 破坏作用域：非严格模式能读写外层局部变量，引擎无法优化变量访问；4. 调试困难：报错难定位，source map 无法覆盖。替代：动态执行用 `new Function()`（独立作用域），JSON 解析用 `JSON.parse`。
- 72. 什么是尾调用优化？✅ 2026-05-17 59分

  **答：** 不知道。满分答案：尾调用是函数最后一步直接返回另一个函数的调用结果。尾调用优化（TCO）：当前函数已执行完不需要保留栈帧，引擎复用当前栈帧不新增，调用栈深度保持 O(1)。尾递归：把中间结果作为参数传递，避免回溯时还需要当前栈帧。现实：ES6 规范要求支持 TCO，但只有 Safari 实现，Chrome/Node.js 未实现，实际深递归要用循环替代。
- 73. `requestAnimationFrame` 和 `setTimeout` 的区别？✅ 2026-05-17 85分

  **答：** rAF 跟屏幕刷新率同步（60Hz 约 16.6ms 一次），用于动画渲染；setTimeout 定时器受事件循环影响不精确。满分答案补充：后台标签页 rAF 自动暂停不浪费 CPU；setTimeout 被限制最小间隔约 1000ms 但不停止；rAF 掉帧时自动跳帧不堆积，setTimeout 恢复时集中执行；取消分别用 cancelAnimationFrame/clearTimeout。
