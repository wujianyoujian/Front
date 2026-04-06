## JS

### 作用域，作用域链、闭包的底层执行过程
游览器中的js执行线程
执行上下文栈（调用栈 call stack）
执行代码
1. 执行代码前，
* 编译阶段
    * 创建全局上下文，进入调用栈
    * 创建LE和VE（创建堆对象context，slots存放）
    * 变量提升
        * var  => undefined
        * let/const => TDZ     
        * 函数声明 => 创建函数对象绑定名字
    * 绑定作用域链，确定父级作用域
2. 执行阶段
* 按顺序执行代码
* 初始化let/const 值
* 执行表达式，语句，函数调用
* 碰到函数调用，创建 函数执行上下文，推入栈，
    * 编译阶段
        * 创建LE，VE
        * 绑定作用域链，确定父级作用域
    * 执行阶段
        * 按顺序执行
```javascript
let a = 12

function foo () {
  let a = 123
  console.log(123)
} 

foo()

Gloabl EC {
    ENV_context：{
        VE：
        LE：a，foo => Function 
    }
    this: window
    outer: 
}

【foo】EC {
    ENV_context： {
        VE:
        LE: a
    }
    this: window
    outer: GLOBAL.ENV_context：
}
```

####  作用域
> 是变量可访问的范围和查找规则，
> JS 通过词法环境实现, 在代码书写的时候就已经确定了
> > 底层是堆对象, 存储声明的变量和方法,指向父级词法环境
> VE和LE都存储在一个堆对象里面, 实际只是规范定义，和metadata类型区分

#### 作用域链
> 多个词法环境组成的链式结构,每个环境都包含对父级环境的引用用
> 提供变量的查找,先查找自身,再通过对父级的引用继续查找 

#### 闭包
函数加上它周围词法环境组合，使函数可以在外层函数执行结束后依然可以访问外层变量

> 可以让函数访问它的外部作用域

* 堆上的context没有被销毁，造成内存泄漏

```javascript
function foo() {
    let i = 0
    return function () {
        i ++;
    }    
}

const add = foo();
add()
add()


global_EC {
    env_context {
        foo: 
        add: tdz
        outer: 
    }
}

foo_EC {
    env_context {
        i: tdz
        outer: env_context
    }
}

执行后
foo_EC 出栈销毁
add.[[env]] => foo.env_context
```

### this 的指向


### 原型和原型链




### 宏任务和微任务

### 事件循环

## HTML

### 语义化
语义化标签的核心价值，不是让代码“更好看”，而是让页面结构更容易被正确理解。
一方面，它对搜索引擎更友好，能帮助识别主内容、导航、文章和标题层级；另一方面，它对可访问性很重要，屏幕阅读器和键盘导航会依赖这些语义信息。
此外，很多原生语义标签还自带默认交互能力，比如 button 天然支持焦点和键盘操作，比用 div 模拟更合理。
从工程角度看，语义化也能提升代码可维护性，让团队成员更容易理解页面结构。
所以我理解语义化的本质，是把页面从“只是能渲染出来”，提升到“能被浏览器、搜索引擎、辅助技术和开发者共同理解”。