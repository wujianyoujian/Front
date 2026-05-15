# CSS 面试题库

## 盒模型

- 1. 说说 CSS 盒模型，标准盒模型和 IE 盒模型有什么区别？`box-sizing` 的作用是什么？
- 2. 什么是 margin 塌陷（collapse）？在哪些场景下会发生？如何解决？

## 选择器与优先级

- 3. CSS 选择器优先级是如何计算的？`!important` 有什么副作用？
- 4. 伪类（pseudo-class）和伪元素（pseudo-element）有什么区别？各举 3 个例子。
- 5. CSS 属性继承是怎么工作的？哪些属性默认继承，哪些不继承？

## BFC

- 6. 什么是 BFC（块级格式化上下文）？触发条件有哪些？有什么实际用途？
- 7. 清除浮动有哪些方法？各有什么优缺点？

## 布局

- 8. Flex 布局中 `flex: 1` 是什么意思？`flex-grow`、`flex-shrink`、`flex-basis` 分别代表什么？
- 9. Flex 布局和 Grid 布局各自适合什么场景？有什么核心区别？
- 10. 实现水平垂直居中有哪些方法？分别适用于什么场景？
- 11. `position` 的五个值（static/relative/absolute/fixed/sticky）各有什么特点？`sticky` 有哪些常见坑？
- 12. 什么是层叠上下文（stacking context）？`z-index` 什么时候会失效？

## 响应式设计

- 13. `rem`、`em`、`vw/vh`、`px` 各有什么区别？移动端适配方案如何选择？
- 14. 媒体查询 `@media` 如何使用？移动优先（mobile-first）和桌面优先有什么区别？
- 15. CSS 函数 `clamp()`、`min()`、`max()` 的用途是什么？

## 动画与过渡

- 16. `transition` 和 `animation` 有什么区别？各自适合什么场景？
- 17. CSS 动画性能优化有哪些手段？为什么 `transform` 比 `top/left` 性能更好？
- 18. `will-change` 属性的作用是什么？滥用会有什么问题？

## CSS 变量与预处理器

- 19. CSS 自定义属性（CSS Variables）和 Sass/Less 变量有什么区别？
- 20. CSS `@layer` 层叠层是什么？解决了什么问题？

## 性能与工程化

- 21. 什么是重排（reflow）和重绘（repaint）？如何减少它们？
- 22. CSS 模块化方案有哪些（CSS Modules、CSS-in-JS、BEM）？各有什么优缺点？
- 23. `display: none`、`visibility: hidden`、`opacity: 0` 三者有什么区别？

## 其他高频考点

- 24. CSS `contain` 属性有什么作用？
- 25. 如何实现一个三角形？如何实现一个 0.5px 的细线？
- 26. `::before` 和 `::after` 伪元素的 `content` 属性有哪些用法？
- 27. CSS 中 `overflow: hidden` 为什么能清除浮动？原理是什么？
- 28. 什么是 CSS Houdini？它解决了什么问题？
- 29. `aspect-ratio` 属性的作用是什么？在它出现之前如何实现固定宽高比？
- 30. 如何用纯 CSS 实现一个响应式的瀑布流布局？
