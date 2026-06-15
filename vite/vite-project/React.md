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



### react如何实现的



### 为啥react 要接受一个不可变对象

- 因为react 底层使用引用进行浅比较，直接修改state 内部的属性，react 认为state 还没有发生变化，不会重新渲染页面，性能代价太高了

### jsx的本质，什么是虚拟dom

### React Route 的原理
监听了页面路由变化
history