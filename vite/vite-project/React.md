# React

## 面试

### useEffect 和useLayout 的区别

- useEffect 在 浏览器dom更新，页面渲染完成之后，异步执行
- 和useLayout 在 DOM 更新之后，但在浏览器绘制之前同步执行。 可以拿到最新dom数据，对页面进行操作，会堵塞页面的渲染

### Hook的闭包陷阱

- 在useEffect(() => { console.log(count) setCount(count + 1) }, []) 是因为hook里面的函数只执行了一次。 而setState hook函数每次执行，都会形成新的值，而count的值是第一次 hook 函数中的引用，形成了闭包，一直都是0，定时器每次执行都是 0 + 1
  > 如何解决，
  >
  > 1. 不产生闭包，setCount((count) => count + 1)
  > 2. 使用Ref

### 什么是受控组件，什么是非受控组件

受控组件：值完全由 props 决定

> 容易发生重复渲染组件，多层form.list 数据

非受控组件：组件自身控制值，外部传入默认值，或者props传入

### :global 为啥可以覆盖样式

一般会将css 的类名进行hash值处理，不会出现重复类名
:global 可以避免这个处理，一般单个文件最外层类名的最后面，也不一定会覆盖，还是要按照优先级来判断

### react 异步更新，批处理

- react 会将多个state 操作合并成一个，避免页面重复渲染， 18 之前的版本，但是异步事件和外部就不生效了，react 只在合成事件和生命周期中进行管理
- 18 开始引入的调度器，所有state 的更新，会统一放入队列中，后面执行由调度器来管理

### react 合成事件是啥

react 自己实现的一套事件系统，比如 onClick, 等事件都不是浏览器原生事件，对原来的事件进行了封装

- 跨浏览器兼容，不同浏览器的事件API有兼容性问题
- 事件委托，统一绑定在根节点上
- 批处理基础
- 跨平台：同一套事件抽象，React Native 也能用

### react如何实现的

1. 初始化，把所有的事件注册到root上，如 root.addEventListener("click", dispatchEvent);
2. 组件执行，渲染的时候，<div onClick={handleClick}></div> handleClick 存在当前组件对应的 fiber 节点上 也会指向dom 的 \_reactFiber，\_reactFiber.pendingProps.onClick 就是这个handleClick
3. 用户点击的时候，还是使用的原生 click，冒泡到 root 上，执行 dispatchEvent 方法
4. 找到 点击目标 target，获取到了fiber \_\_reactFiber
5. 通过当前节点中 return 指向父节点，向上获取到所有的 onClick方法，存放起来，就是所有冒泡的事件，然后执行，捕获同理

### 为啥react 要接受一个不可变对象

- 因为react 底层使用引用进行浅比较，直接修改state 内部的属性，react 认为state 还没有发生变化，不会重新渲染页面，性能代价太高了

### jsx的本质，什么是虚拟dom

### React Route 的原理
监听了页面路变化
history