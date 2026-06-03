```tsx
function App() {
    <div >
        <button onClick={() => console.log(12)}>
        </button>
    </div>
}
const container = document.getElementById("root")
MReact.render(<App />, container)
```


先编译 JSX => createElement => element 
执行 render（element， container）
构建根 fiber 节点，工作单元，通过调度器进行调度，开始处理fiber 节点
判断fiber 的类型取决于 element 的类型    
* 函数
    函数需要执行，获取返回的 element，根据element 进行协调 reconcile
* 正常的element
    如果没有dom，（第一次渲染没有）根据 element 创建 dom 对象，开始进行协调 reconcile

reconcile：
    1. 找到对应的旧fiber（第一次为空），获取旧的fiber 上的 子fiber
    2. 遍历当前fiber 上的 children elements
        从第一个开始，旧的fiber 和 新的element 对比，开始diff，构建 新fiber
            相同类型：更新element上的属性，parent => fiber,  alternate = 老子fiber
            不是相同类型存在element：直接替换，创建新的fiber，    
            不是相同类型存在old的子fiber，删除
        旧子fiber 存在，当前旧子fiber 指向 下一个兄弟
        如果遍历到第一个，当前fiber的child 指向 新子fiber，遍历到第一个以后，前一个子fiber的兄弟 => 指向当前子fiberfiber.sibling = newFiber
        在当前轮次中记录 上一个子fiber 为当前fiber

当前fiber 处理完了，获取下一个处理的fiber
    如果有子fiber 直接返回
    如果没有子fiber，从当前fiber 的兄弟fiber开始遍历，找到就返回

所有的fiber 都处理完了，进入commit 阶段

根据当前fiber 更新整个dom