## 父子组件传递

通过 props 和 emit 事件的方式

使用ref 就可以使用 子组件的方法
defineExpose 暴露出子组件的方法

## v-if 和 v-show 的区别
v-if 为true 会渲染元素，为false 会删除元素
开销大

v-show 只是通过 display 来进行控制

## 生命周期
1. 创建阶段
  父 组件 befroeCreate，create
  子 组件 beforeCreate，create 
2. 挂载阶段
  父 beforeMount
  子 beforeMount
  子 Mount
  父 Mount
  只有挂载完成，父组件才挂载完成

3. 更新阶段
  同上
4. 销毁阶段
  同上

## ref 和 reactive 的区别

都是 proxy代理对象
在赋值和解构上区别
ref 还可以保留响应式

reactive 无法保留响应式了，因为就不是响应式对象了，重新赋值后