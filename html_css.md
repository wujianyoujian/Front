# HTML/CSS 前端面试题库

## HTML 基础

- 1. DOCTYPE 的作用是什么？HTML5 的 DOCTYPE 怎么写？✅ 2026-05-17 00:00 59分

  **答：** 文档声明类型 <!DOCTYPE HTML5> 完整答案：DOCTYPE 告诉浏览器用哪种 HTML 规范解析文档，核心作用是触发标准模式（Standards Mode），避免浏览器进入怪异模式（Quirks Mode）。HTML5 写法：`<!DOCTYPE html>`，极简不区分大小写，无需引用 DTD。

  **延伸 A：** 怪异模式和标准模式在盒模型上有什么具体区别？ → 用户不知道 标准模式使用 content-box，width 只含内容区，padding/border 额外撑大；怪异模式使用 border-box，width 包含内容+padding+border，与 IE5 行为一致。现代开发常全局设置 box-sizing: border-box 主动采用此模型。
- 2. HTML5 新增了哪些特性？✅ 2026-05-17 00:01 59分

  **答：** 用户不知道 完整答案：1.语义化标签 header/footer/nav/main/article/section/aside；2.多媒体 audio/video；3.表单增强 新type(email/number/date)、placeholder/required；4.存储 localStorage/sessionStorage/IndexedDB；5.图形 canvas/SVG；6.通信 WebSocket/SSE；7.设备API Geolocation/Web Workers/History API；8.废弃 font/center/frame 等表现性标签。
- 3. 什么是语义化 HTML？为什么重要？✅ 2026-05-17 00:02 65分

  **答：** 更好的SEO 完整答案：用正确标签表达正确含义。重要原因：1.SEO-搜索引擎识别h1/article/nav提升排名；2.可访问性-屏幕阅读器依赖语义标签；3.可维护性-代码结构清晰；4.浏览器默认行为-button自带键盘事件。

  **延伸 A：** div 和 section 都是块级容器，什么时候用 section，什么时候用 div？ → 用户不知道 section 用于有独立主题和标题的内容块，是文档大纲的一部分；div 纯粹为布局/样式/JS操作而包裹，无语义。判断：去掉换成div语义会丢失→用语义标签，只为加class或布局→用div。
- 4. src 和 href 的区别是什么？✅ 2026-05-17 00:03 59分

  **答：** 用户不知道 完整答案：src(source)嵌入资源，将外部资源嵌入文档，浏览器遇到会暂停HTML解析下载执行，用于img/script/iframe；href(hypertext reference)引用/链接，建立文档与外部资源关联不嵌入，不暂停解析并行下载，用于a/link。关键区别：src替换元素内容，href建立关联关系。
- 5. 行内元素、块级元素、行内块元素的区别？✅ 2026-05-17 00:04 59分

  **答：** 用户不知道 完整答案：块级-独占一行/可设宽高/默认宽度100%/四方向margin；行内-不独占/不可设宽高/内容宽度/只有左右margin；行内块-不独占/可设宽高/内容宽度/四方向margin。常见：块级div/p/h1-h6，行内span/a/strong，行内块img/input/button。img和input是替换元素，虽是行内但可设宽高。
- 6. HTML 中空元素有哪些？✅ 2026-05-17 00:05 59分

  **答：** 用户不知道 完整答案：空元素是没有内容、不需要闭合标签的元素。常见：br/hr/img/input/link/meta/area/base/col/embed/param/source/track/wbr。注意：HTML5不需要自闭合斜杠写br而非br/，但JSX中必须写br/因为遵循XML规范。
- 7. meta 标签有哪些常用属性和用途？✅ 2026-05-17 00:06 70分

  **答：** 属性配置，视口缩放控制，编码格式 完整答案：charset设置字符编码；viewport控制移动端视口(width=device-width,initial-scale=1.0)；SEO相关description/keywords/robots；http-equiv模拟HTTP头(X-UA-Compatible/refresh/CSP)；Open Graph社交分享；format-detection禁止电话识别。

  **延伸 A：** viewport的initial-scale=1.0和user-scalable=no分别有什么作用？user-scalable=no有什么副作用？ → 用户不知道 initial-scale=1.0设置初始缩放比1不缩放；user-scalable=no禁止双指缩放，副作用：违反WCAG无障碍标准影响视力不好用户，iOS10+已忽略该属性，影响SEO排名。推荐不禁止缩放。
- 8. link 和 @import 引入 CSS 的区别？✅ 2026-05-17 00:07 59分

  **答：** 动态引入 完整答案：link在HTML head中并行加载CSS；@import在CSS内串行加载（等父CSS加载完才加载），可能产生FOUC。link可用JS动态创建，@import不能；link兼容所有浏览器，@import需IE5+。生产环境优先用link，@import串行加载性能更差。

## HTML 进阶

- 9. script 标签的 defer 和 async 属性有什么区别？✅ 2026-05-17 00:08 78分

  **答：** 都是异步加载，async加载完直接执行，defer等待DOMContentLoaded完成才执行 完整答案：两者都不阻塞HTML解析；async下载完立即执行不保证顺序，适合独立脚本(统计)；defer在HTML解析完后、DOMContentLoaded触发前执行，保证顺序，适合依赖DOM的脚本。

  **延伸 A：** 同时有async和defer脚本哪个先执行？ → async先执行（下载完立即执行），但若async下载慢defer也可能先执行，两者无相互等待机制，取决于下载速度。
- 10. 浏览器的渲染过程是什么？✅ 2026-05-17 00:09 75分

  **答：** 下载html解析，碰到link并行下载css，生成dom/cssom树结合生成渲染树，调用gpu渲染合成 完整答案：1.解析HTML→DOM Tree；2.并行下载CSS→CSSOM Tree（CSS阻塞渲染）；3.遇到JS阻塞HTML解析（除非defer/async）；4.DOM+CSSOM→Render Tree（display:none不在其中）；5.Layout计算位置尺寸；6.Paint填充像素生成图层；7.Composite GPU合并图层输出屏幕。transform/opacity只触发Composite性能最好。

  **延伸 A：** 什么是关键渲染路径？如何优化？ → 用户不知道 CRP是从收到HTML到首次渲染内容的链路。卡在路径上的：HTML/阻塞渲染的CSS/阻塞解析的JS。优化：内联首屏CSS/非首屏CSS加media属性/JS加defer或async/preload预加载关键资源/压缩开启gzip。直接影响FCP和LCP指标。
- 11. localStorage、sessionStorage 和 Cookie 的区别？✅ 2026-05-17 00:10 59分

  **答：** 用户不知道 完整答案：Cookie~4KB/可设过期时间/自动随HTTP请求发送/可服务端访问，重要属性HttpOnly防XSS/Secure仅HTTPS/SameSite防CSRF；localStorage~5MB/永久存储/不随请求发送/同源共享；sessionStorage~5MB/标签页关闭清除/仅当前标签页。场景：Cookie用于身份认证，localStorage用于持久化偏好，sessionStorage用于临时状态。
- 12. iframe 的优缺点有哪些？✅ 2026-05-18 00:00 59分

  **答：** 用户不知道 完整答案：优点：JS/CSS隔离不污染/可嵌入第三方内容(地图支付广告)/微前端独立部署/sandbox属性限制权限；缺点：每个iframe独立浏览上下文性能差/SEO不友好/跨域通信需postMessage/高度自适应麻烦/点击劫持安全风险需X-Frame-Options防御/移动端体验差。
- 13. Web Components 是什么？包含哪些技术？✅ 2026-05-18 00:01 65分

  **答：** 可以自己定义模板组件 完整答案：浏览器原生组件化方案，三项技术：1.Custom Elements-自定义HTML元素，用customElements.define注册；2.Shadow DOM-隔离的DOM子树，内部CSS/JS与外部完全隔离，attachShadow创建；3.HTML Template-template标签内容不渲染可复用。与React/Vue区别：原生标准无需框架，但无响应式系统需手动操作DOM。

  **延伸 A：** Shadow DOM的mode:open和mode:closed区别？ → 用户不知道 open模式外部JS可通过element.shadowRoot访问内部；closed模式shadowRoot返回null外部无法访问。大多数场景用open方便调试，closed用于严格封装（浏览器内置元素如input/video使用closed）。
- 14. 什么是 Web Workers？使用场景是什么？✅ 2026-05-18 00:02 75分

  **答：** 独立的线程，用来执行计算量大的任务，避免堵塞页面造成卡顿 完整答案：Web Worker在浏览器后台开独立线程执行JS，不阻塞主线程。限制：不能操作DOM/不能访问window，通过postMessage通信（结构化克隆深拷贝）。场景：大数据处理/图片压缩/加密解密/复杂计算/大文件解析。种类：Dedicated Worker(专用)/Shared Worker(多页面共享)/Service Worker(拦截网络请求)。

  **延伸 A：** postMessage传递大数据性能优化？ → 用户不知道 使用Transferable Objects转移所有权（零拷贝），传递时第二个参数指定转移列表，转移后原始数据变空。支持ArrayBuffer/ImageBitmap/OffscreenCanvas。SharedArrayBuffer可共享内存完全不拷贝，但需配合Atomics防竞态，且需设置跨域隔离头(COOP/COEP)。
- 15. `<dialog>` 元素和 Popover API 是什么？有什么用途？✅ 2026-05-18 00:03 62分

  **答：** 写dom通过js控制 完整答案：dialog是浏览器原生模态框，showModal()打开(有遮罩/焦点锁定/Esc关闭)/show()非模态/close()关闭，::backdrop自定义遮罩，在顶层渲染不受z-index影响。Popover API更轻量用于tooltip/下拉菜单，popovertarget属性无需JS，点击外部自动关闭。区别：dialog支持模态+遮罩+焦点锁定，Popover非模态但点击外部自动关闭。

## CSS 盒模型

- 16. 说说 CSS 盒模型，标准盒模型和 IE 盒模型有什么区别？`box-sizing` 的作用是什么？✅ 2026-05-18 00:04 82分

  **答：** 盒模型由content+padding+border+margin组成，标准盒模型width=content，IE怪异盒模型width=content+padding+border 完整答案：box-sizing: content-box(默认标准)/border-box(IE模型)。最佳实践全局设置*{box-sizing:border-box}更直观。margin永远不计入width。

  **延伸 A：** 为什么margin不计入width而padding和border会？ → 用户不知道 padding/border是元素内部的一部分，背景色延伸到padding区域，border是元素边框，都属于元素本身；margin是元素外部空白，背景色不覆盖margin区域，不属于元素本身。
- 17. 什么是 margin 塌陷（collapse）？在哪些场景下会发生？如何解决？✅ 2026-05-18 00:05 72分

  **答：** 两个相邻div之间margin会重叠，BFC块级格式化上下文 完整答案：垂直方向margin相遇合并为较大值（不是相加）。场景：1.相邻兄弟元素；2.父子元素（无border/padding隔离时子元素margin穿透父元素）；3.空块级元素自身上下margin合并。只发生在垂直方向。解决：display:flow-root(推荐，专为BFC设计无副作用)/overflow:hidden(有裁剪副作用)/父元素加border或padding隔断。

  **延伸 A：** display:flow-root为什么比overflow:hidden更推荐？ → 用户不知道 overflow:hidden触发BFC是副作用，本职是裁剪溢出内容，会导致下拉菜单/tooltip超出容器被裁掉；display:flow-root专门为创建BFC设计，无任何副作用，现代浏览器全部支持。

## CSS 选择器与优先级

- 18. CSS 选择器优先级是如何计算的？`!important` 有什么副作用？✅ 2026-05-18 00:06 59分

  **答：** 用户不知道 完整答案：四位数权重(a,b,c,d)：内联(1,0,0,0)>ID(0,1,0,0)>类/伪类/属性(0,0,1,0)>元素/伪元素(0,0,0,1)>通配符(0,0,0,0)，!important凌驾一切。从左到右逐位比较不进位。!important副作用：破坏优先级规则形成军备竞赛/内联样式也无法覆盖/只推荐覆盖第三方库时使用。

  **延伸 A：** :not()伪类本身有没有优先级权重？ → 用户不知道 :not()本身无权重，括号内选择器有权重。:is()/:has()取括号内最高权重；:where()括号内权重全部归零，专门用于写低优先级基础样式。
- 19. 伪类（pseudo-class）和伪元素（pseudo-element）有什么区别？各举 3 个例子。✅ 2026-05-18 00:07 65分

  **答：** :hover ::after ::before 完整答案：伪类描述元素某种状态(:hover/:focus/:nth-child/:checked/:disabled/:not)；伪元素在DOM中创建虚拟节点(::before/::after/::first-line/::first-letter/::placeholder/::selection)。CSS3改为双冒号区分两者，但浏览器兼容单冒号写法。
- 20. CSS 属性继承是怎么工作的？哪些属性默认继承，哪些不继承？✅ 2026-05-18 00:08 59分

  **答：** 用户不知道 完整答案：子元素自动获得父元素某些属性值。默认继承（文字排版相关）：color/font-family/font-size/font-weight/line-height/text-align/cursor/visibility。默认不继承（盒模型布局相关）：width/height/margin/padding/border/background/display/position/float/z-index。手动控制：inherit强制继承/initial重置初始值/unset(有继承值用继承否则用初始)/revert恢复浏览器默认。口诀：文字排版相关大多继承，盒子布局相关大多不继承。

## BFC 与格式化上下文

- 21. 什么是 BFC（块级格式化上下文）？触发条件有哪些？有什么实际用途？✅ 2026-05-18 00:09 59分

  **答：** 用户不知道 完整答案：BFC是独立渲染区域，内部布局不影响外部。触发条件：overflow:hidden/auto/scroll/display:flow-root(推荐)/flex/grid/inline-block/position:absolute或fixed/float。三个用途：1.阻止父子margin塌陷；2.清除浮动包含浮动子元素；3.阻止被浮动元素覆盖实现两栏布局。本质：BFC内部是独立小世界，浮动/margin不泄漏到外部。
- 22. 清除浮动有哪些方法？各有什么优缺点？✅ 2026-05-18 00:10 65分

  **答：** overflow:hidden 完整答案：1.overflow:hidden触发BFC-简单但会裁剪溢出内容；2.display:flow-root-推荐无副作用但IE不支持；3.clearfix伪元素(::after{content:'';display:block;clear:both})-兼容性好无副作用；4.父元素设浮动-父元素也脱离文档流不推荐；5.固定高度-内容变化失效不推荐。现代项目用Flex/Grid根本不需要浮动。
- 23. CSS `overflow: hidden` 为什么能清除浮动？原理是什么？✅ 2026-05-18 00:11 68分

  **答：** BFC块级格式化上下文，不会影响外部内容 完整答案：CSS规范规定BFC在计算高度时必须包含内部所有元素包括浮动元素。overflow不为visible时浏览器强制创建BFC（因为要裁剪溢出必须知道内容边界）。逻辑链：overflow:hidden→触发BFC→BFC规则计算高度包含浮动→父容器高度自动撑开。本质不是清除浮动，而是BFC把浮动子元素纳入自己的高度计算范围。

## CSS 布局

- 24. Flex 布局中 `flex: 1` 是什么意思？`flex-grow`、`flex-shrink`、`flex-basis` 分别代表什么？✅ 2026-05-18 00:12 59分

  **答：** 用户不知道 完整答案：flex:1 = flex-grow:1; flex-shrink:1; flex-basis:0%。flex-grow剩余空间分配比例(默认0不放大)；flex-shrink空间不足时收缩比例(默认1等比收缩，0不收缩)；flex-basis分配前初始尺寸(0%忽略内容从0开始，auto以内容宽度为基准)。常用：flex:1等分/flex:auto基于内容等比/flex:none不伸不缩。flex:1和flex:auto区别：前者严格等分，后者内容多的元素更宽。
- 25. Flex 布局和 Grid 布局各自适合什么场景？有什么核心区别？✅ 2026-05-18 00:13 59分

  **答：** 用户不知道 完整答案：Flex一维布局(行或列)，内容驱动，适合导航栏/按钮组/垂直居中/线性排列；Grid二维布局(行列同时控制)，布局驱动，适合页面整体布局/卡片网格/复杂行列定位。选择口诀：一行或一列→Flex，需同时控制行列→Grid。两者可嵌套：Grid做页面骨架，Flex做组件内部排列。
- 26. 实现水平垂直居中有哪些方法？分别适用于什么场景？✅ 2026-05-18 00:14 75分

  **答：** 用户不知道 完整答案：1.Flex-display:flex+justify-content:center+align-items:center，现代首选；2.Grid-display:grid+place-items:center，已用Grid时顺手；3.absolute+transform-top:50%/left:50%/transform:translate(-50%,-50%)，尺寸未知的弹窗浮层；4.absolute+margin:auto-四方向0+固定宽高+margin:auto，尺寸已知兼容性好；5.line-height-仅限单行文本；6.table-cell-老方案兼容旧浏览器。

  **延伸 A：** transform:translate(-50%,-50%)中50%基于谁？ → 基于元素自身宽高，配合top/left:50%（基于父元素）实现精确居中。对比margin百分比基于父元素宽度。

  **延伸 B：** justify-content和align-items分别控制哪个轴？flex-direction改column后互换吗？ → 用户回答：默认x轴，会互换。正确，justify-content控制主轴，align-items控制交叉轴，direction改column后主轴变y轴，两者控制方向互换。
- 27. `position` 的五个值（static/relative/absolute/fixed/sticky）各有什么特点？`sticky` 有哪些常见坑？✅ 2026-05-18 00:15 59分

  **答：** 用户不知道 完整答案：static默认文档流top/left无效；relative占位偏移自身原位置常作包含块；absolute脱流找最近非static祖先定位；fixed脱流相对视口，坑：父元素有transform时相对父元素；sticky滚动到阈值前relative超过后fixed，相对最近滚动容器。sticky坑：1.必须设top等阈值；2.父元素高度不够；3.父元素有overflow:hidden/auto/scroll截断；4.Safari需-webkit-sticky。

  **延伸 A：** transform不为none的父元素算不算absolute包含块？ → 用户不知道 算，transform不为none创建新层叠上下文同时成为absolute和fixed的包含块，fixed在transform父元素下相对父元素而非视口，高频坑点。

  **延伸 B：** sticky父元素加overflow:hidden为什么失效？ → 用户不知道 sticky需要可滚动祖先监听滚动事件，overflow:hidden让父元素成为新滚动容器，但该容器不会滚动，sticky监听的滚动永远不触发，永远停在relative状态。
- 28. 什么是层叠上下文（stacking context）？`z-index` 什么时候会失效？✅ 2026-05-18 00:16 59分

  **答：** 用户不知道 完整答案：层叠上下文是独立z轴空间，内部z-index只在空间内比较不跨上下文。触发条件：position非static+z-index不为auto/opacity<1/transform不为none/filter不为none/will-change/isolation:isolate/flex子元素+z-index不为auto。层叠顺序从低到高：负z-index/块级背景边框/浮动/行内/z-index:0/正z-index。z-index失效场景：1.元素无定位；2.父元素触发层叠上下文（opacity/transform/filter），子元素z-index再大也出不去；3.flex子元素未设z-index。

  **延伸 A：** isolation:isolate用途？和z-index:0创建层叠上下文区别？ → 用户不知道 isolation:isolate专门隔离内部z-index防止子元素逃逸，不影响元素在外部的层叠顺序，无副作用；position+z-index:0也创建层叠上下文但会影响外部层叠排序。isolation:isolate是最干净的隔离方式，适合Modal等组件内部隔离。
- 29. 如何实现两栏布局和三栏布局？✅ 2026-05-18 00:17 62分

  **答：** flex布局 完整答案：两栏(左固定右自适应)：1.Flex-container设display:flex，left固定宽+flex-shrink:0，right设flex:1；2.float+BFC-left浮动，right设overflow:hidden触发BFC；3.absolute+margin-left。三栏(左右固定中间自适应)：1.Flex-左右固定宽flex-shrink:0，center设flex:1；2.Grid-grid-template-columns:200px 1fr 200px；3.圣杯/双飞翼布局(历史方案)。

  **延伸 A：** 圣杯布局和双飞翼布局区别？ → 用户不知道 两者都让中间列HTML优先渲染(先被解析)。圣杯：container设padding给左右留位，左右列用relative偏移，实现复杂；双飞翼：中间列多套一层div，用margin腾位置，更简单。现代项目用Flex/Grid，两者是历史方案考原理。

## CSS 响应式设计

- 30. `rem`、`em`、`vw/vh`、`px` 各有什么区别？移动端适配方案如何选择？✅ 2026-05-18 00:18 59分

  **答：** 用户不知道 完整答案：px固定像素；em基于父元素font-size，嵌套累乘难维护；rem基于html根字号，全局统一；vw/vh视口宽高1%，天然响应式。移动端方案：1.vw方案(推荐)-配合postcss-px-to-viewport自动转换，写px自动变vw；2.rem+JS动态设根字号(旧方案)-依赖JS可能闪烁；3.rem+vw结合-html{font-size:4vw}不依赖JS；4.媒体查询-PC响应式。

  **延伸 A：** vw方案缺点？大屏字号过大如何限制？ → 用户不知道 vw线性缩放无上下限，大屏字号过大。解决：clamp(min,preferred,max)，如html{font-size:clamp(12px,calc(100vw/37.5),18px)}，视口再大不超过18px，替代JS动态设根字号。
- 31. 媒体查询 `@media` 如何使用？移动优先（mobile-first）和桌面优先有什么区别？✅ 2026-05-18 00:19 59分

  **答：** 用户不知道 完整答案：@media screen and (min-width:768px){}，可加在link标签media属性。移动优先用min-width默认写手机样式向上扩展，性能好手机只加载最少样式；桌面优先用max-width默认写桌面向下收缩，手机需覆盖大量样式。推荐移动优先，符合渐进增强原则。

  **延伸 A：** 常用断点怎么定？Tailwind断点设计？ → 用户不知道 Tailwind五档：sm:640px/md:768px/lg:1024px/xl:1280px/2xl:1536px，全部min-width移动优先，基于真实设备分布。实际项目直接参考Tailwind断点，3~4个够用，不要自己发明。
- 32. CSS 函数 `clamp()`、`min()`、`max()` 的用途是什么？✅ 2026-05-18 00:20 59分

  **答：** 用户不知道 完整答案：min(a,b)取最小值，max(a,b)取最大值，clamp(min,preferred,max)限制范围等价于max(min,min(val,max))。场景：container{width:min(1200px,100%-48px)}响应式容器；h1{font-size:clamp(24px,5vw,48px)}响应式字号无需媒体查询；btn{padding:max(12px,2vw)}保证最小可点击区域。与媒体查询区别：断点式跳变vs连续平滑缩放。

  **延伸 A：** min(500px,90vw)和max-width:500px;width:90vw区别？ → 用户不知道 效果相同但min()是单个属性值，可用在任何数值属性(padding/gap/border-radius/font-size)，而max-width只能控制width，这是最大优势。
- 33. 移动端 1px 问题是什么？如何解决？✅ 2026-05-18 00:21 59分

  **答：** 用户不知道 完整答案：根源是DPR(设备像素比)，iPhone DPR=2/3，CSS 1px渲染成2~3物理像素，比设计稿细线粗。方案：1.::after+scaleY(0.5)(最常用)-伪元素height:1px+transform:scaleY(0.5)+transform-origin:0 bottom；2.viewport缩放-initial-scale=0.5，影响全局不推荐；3.border-image渐变；4.box-shadow:0 0.5px 0，安卓兼容差。

  **延伸 A：** 四边框为什么要width/height:200%再scale(0.5)？ → 用户不知道 直接100%+scale(0.5)元素本身也缩小到50%覆盖不了父元素。先×2再×0.5尺寸不变，但border的1px经scale(0.5)变成0.5px=1物理像素。transform-origin:0 0防止位置偏移。

## CSS 动画与过渡

- 34. `transition` 和 `animation` 有什么区别？各自适合什么场景？✅ 2026-05-18 00:22 78分

  **答：** transition过渡效果需触发条件，animation动画可持续执行 完整答案：transition需触发条件(hover/class切换)，只有首尾两帧，不能循环，适合交互反馈；animation自动播放，可多关键帧/@keyframes，支持infinite循环/暂停/反向，适合loading/持续动效。

  **延伸 A：** display:none切换为什么transition失效？如何解决？ → 用户回答：元素直接没有了。正确，display:none让元素从渲染树移除无中间状态无法插值。解决：1.visibility+opacity替代；2.max-height:0过渡；3.CSS @starting-style新特性+transition:display allow-discrete(2024+)。
- 35. CSS 动画性能优化有哪些手段？为什么 `transform` 比 `top/left` 性能更好？✅ 2026-05-18 00:23 75分

  **答：** 减少重绘回流，GPU加速 完整答案：top/left触发Layout→Paint→Composite完整流水线；transform/opacity只触发Composite，在GPU独立线程完成不占主线程。优化手段：1.优先用transform/opacity；2.will-change:transform提前提升GPU图层减少首帧卡顿；3.避免动画中用width/height/margin等触发重排属性；4.position:absolute脱流减少重排影响范围；5.用requestAnimationFrame替代setTimeout。

  **延伸 A：** will-change滥用问题？何时用何时不用？ → 用户不知道 will-change提前把元素提升为独立GPU合成层，代价是显存占用。滥用导致移动端显存不足反而卡顿。正确用法：只在动画即将发生前加(hover时或JS动态加)，结束后移除设回auto，不要全局加或给静态元素加。
- 36. `will-change` 属性的作用是什么？滥用会有什么问题？✅ 2026-05-18 00:24 95分

  **答：** 提前告诉浏览器使用独立图层进行合成渲染，滥用导致性能消耗更多页面卡顿崩溃 完整答案：will-change提前把元素提升为独立GPU合成层，减少动画首帧卡顿。滥用问题：每个元素占用显存，移动端显存有限导致卡顿崩溃。最佳实践：动画即将发生前加，结束后移除设回auto。

## CSS 变量与预处理器

- 37. CSS 自定义属性（CSS Variables）和 Sass/Less 变量有什么区别？✅ 2026-05-18 00:25 65分

  **答：** CSS变量是原生的 完整答案：CSS变量浏览器运行时生效，可JS动态修改/遵循CSS级联继承/媒体查询内可修改/DevTools可见；Sass变量编译时处理，编译后是固定值无级联无法动态修改。实际项目两者配合：Sass做编译时逻辑，CSS变量做运行时主题切换。

  **延伸 A：** CSS变量如何实现暗黑模式？ → 用户不知道 方案1：@media(prefers-color-scheme:dark)修改:root变量跟随系统；方案2：:root.dark{}+JS切换classList手动控制+localStorage持久化。最佳实践两者结合，所有颜色用CSS变量，切换主题只改变量值组件代码不动。
- 38. CSS `@layer` 层叠层是什么？解决了什么问题？✅ 2026-05-18 00:26 59分

  **答：** 用户不知道 完整答案：@layer把CSS规则分组到具名层，层优先级由声明顺序决定(后声明更高)，与选择器权重无关。解决第三方库权重冲突问题：把库放入低优先级层，自定义样式放高优先级层，无需!important或堆选择器。优先级：!important > 无层样式 > @layer后声明层 > 先声明层。无层样式高于所有层是向后兼容设计。

  **延伸 A：** 无层样式优先级为什么高于所有层？ → 用户不知道 向后兼容设计，旧代码没用@layer，若无层样式优先级最低则引入@layer后旧代码全部失效。保证旧代码不受影响，第三方库放入低优先级层后自己的无层样式天然能覆盖。

## CSS 性能与工程化

- 39. 什么是重排（reflow）和重绘（repaint）？如何减少它们？✅ 2026-05-18 00:27 62分

  **答：** 重排就是页面重新计算布局，成本高，重绘就是不影响页面布局，如背景颜色，透明度，等，使用GPU加速，独立图层 完整答案：重排触发几何属性变化(width/height/margin/padding/position/font-size)重新计算布局，代价最高；重绘触发外观属性变化(color/background/border-color)重新填充像素，代价中等；transform/opacity只触发Composite。触发链：重排→必然重绘→Composite。减少手段：1.用transform/opacity替代top/left做动画；2.批量修改DOM用DocumentFragment或先display:none；3.读写分离避免交替读写，用rAF批量写；4.避免循环内读offsetWidth等触发强制回流属性；5.will-change提前提升合成层勿滥用。

  **延伸 A：** 强制同步布局(forced synchronous layout)：浏览器批量延迟写操作，同帧内先写后读几何属性时被迫立即布局计算。读写分离解决：先读完再批量写。触发属性：offsetWidth/Height/scrollTop/getBoundingClientRect/getComputedStyle。

  **延伸 B：** rAF vs setTimeout(fn,0)：setTimeout≥4ms执行时机不确定可能跳帧；rAF与屏幕刷新率同步(60fps=16.6ms/帧)，在每帧绘制前统一调用，天然批量避免中间帧多余重排。
- 40. CSS 模块化方案有哪些（CSS Modules、CSS-in-JS、BEM）？各有什么优缺点？

  **答：** 完整答案：**BEM**（Block__Element--Modifier）命名约定，无需工具，可读性强，但类名冗长，依赖人工遵守；**CSS Modules** 构建时将类名哈希化实现局部作用域，与框架无关，零运行时，缺点是需要构建工具，动态样式不便；**CSS-in-JS**（styled-components/Emotion）运行时生成样式，支持动态主题/props驱动，与组件强绑定，缺点是运行时开销、SSR 需额外处理、包体积大；**Tailwind CSS** 原子类方案，无自定义样式冲突，极小 CSS 产物，缺点是 HTML 类名冗长，学习曲线。现代项目推荐：组件库用 CSS Modules，业务项目用 Tailwind，需要高度动态主题用 CSS-in-JS。

  **延伸 A：** CSS Modules 的 :global 和 :local 有什么用？ → :local（默认）对类名哈希化实现局部作用域；:global 跳过哈希化保持全局类名，用于覆盖第三方库样式或需要全局生效的样式（如 .active 状态类被 JS 动态添加时）。

- 41. `display: none`、`visibility: hidden`、`opacity: 0` 三者有什么区别？

  **答：** 完整答案：**display:none** 从渲染树移除，不占空间，触发重排，子元素无法覆盖显示，不可被屏幕阅读器读取，transition 无效；**visibility:hidden** 占位隐藏，触发重绘不触发重排，子元素可设 visibility:visible 显示，屏幕阅读器忽略，transition 有效；**opacity:0** 占位隐藏，只触发 Composite，仍可响应鼠标事件（pointer-events:none 可禁用），子元素无法覆盖，transition 有效，屏幕阅读器可读。场景：彻底移除用 display:none，占位隐藏+过渡动画用 opacity:0，占位隐藏+子元素可见用 visibility:hidden。

  **延伸 A：** 为什么 display:none 切换无法用 transition 做淡入淡出？ → display:none 让元素脱离渲染树，无中间状态无法插值。解决：用 opacity+visibility 组合，visibility:hidden 不可见但占位，opacity:0→1 做淡入，两者同时 transition，visibility 延迟消失。

## CSS 其他高频考点

- 42. CSS `contain` 属性有什么作用？

  **答：** 完整答案：contain 告诉浏览器该元素的内部变化不影响外部，允许浏览器跳过外部的重排/重绘计算，提升渲染性能。值：**layout**（内部布局不影响外部）、**paint**（内部绘制不超出边界，类似 overflow:hidden 但不裁剪）、**size**（元素尺寸不依赖子元素，需配合固定尺寸）、**style**（计数器/引号不泄漏）、**content**（= layout + paint + style）、**strict**（= layout + paint + size + style）。场景：无限滚动列表每个 item 加 contain:content，滚动时只重排可见区域；组件库隔离内部样式副作用。

  **延伸 A：** contain 和 BFC 有什么区别？ → BFC 解决浮动/margin 塌陷等布局问题；contain 是性能优化提示，告诉浏览器可以跳过外部计算。contain:layout 会创建 BFC，但目的不同。

- 43. 如何实现一个三角形？如何实现一个 0.5px 的细线？

  **答：** 完整答案：**CSS 三角形**：利用 border 原理，元素 width/height 为 0，四边 border 颜色不同时呈现梯形，隐藏三边（transparent）只留一边即三角形。向上三角：`border-left:10px solid transparent; border-right:10px solid transparent; border-bottom:10px solid red`。现代方案：clip-path:polygon(50% 0%,0% 100%,100% 100%) 更直观，或用 SVG。**0.5px 细线**：方案1（推荐）伪元素 + scaleY(0.5)：`::after{content:'';display:block;height:1px;background:#ccc;transform:scaleY(0.5);transform-origin:0 bottom}`；方案2 box-shadow:0 0.5px 0 #ccc（iOS 支持好，安卓差）；方案3 linear-gradient(to bottom,#ccc 50%,transparent 50%) 背景渐变模拟。

  **延伸 A：** clip-path 实现三角形和 border 实现有什么优缺点？ → clip-path 语义清晰、支持动画过渡、不影响布局；border 方案兼容性更好（IE9+），但 border 占用元素 border 属性，clip-path 不占用，且 clip-path 可实现任意多边形。

- 44. `::before` 和 `::after` 伪元素的 `content` 属性有哪些用法？

  **答：** 完整答案：content 是伪元素必须属性（空字符串也要写）。用法：1.**字符串** `content:'★'` 插入文本/图标；2.**attr()** `content:attr(data-tooltip)` 读取元素属性值，常用于 tooltip；3.**counter()** `content:counter(section)` 配合 counter-increment 实现自动编号；4.**url()** `content:url(icon.svg)` 插入图片；5.**空字符串** `content:''` 配合 display:block 做 clearfix 或装饰性图形（三角形、细线）；6.**open-quote/close-quote** 插入引号字符。注意：伪元素内容不可被用户选中，不被屏幕阅读器读取（装饰性内容用伪元素，语义内容放 HTML）。

- 45. 什么是 CSS Houdini？它解决了什么问题？

  **答：** 完整答案：CSS Houdini 是一组底层浏览器 API，允许开发者直接介入浏览器渲染引擎的 CSS 解析、布局、绘制流程，扩展 CSS 能力而无需等待标准制定。核心 API：**CSS Properties and Values API**（CSS.registerProperty 注册自定义属性，支持类型检查和动画过渡）；**Paint API**（CSS.paintWorklet 用 Canvas API 绘制背景/边框，如 border-image 复杂图案）；**Layout API**（自定义布局算法，如瀑布流）；**Animation Worklet**（高性能动画脱离主线程）。解决的问题：polyfill 新 CSS 特性无需等浏览器实现；实现原生 CSS 无法表达的视觉效果；性能更好（在渲染线程执行）。现状：Paint API 支持较好，其他 API 仍在实验阶段。

- 46. `aspect-ratio` 属性的作用是什么？在它出现之前如何实现固定宽高比？

  **答：** 完整答案：**aspect-ratio** 直接设置元素宽高比，如 `aspect-ratio:16/9`，宽度确定后高度自动计算，响应式图片/视频容器首选。**出现之前的 padding-top hack**：利用 padding 百分比基于父元素宽度的特性，容器设 `position:relative; padding-top:56.25%（9/16）`，内部绝对定位子元素填满，实现 16:9 容器。缺点：需要额外 DOM 节点，语义差，高度无法直接设置。**aspect-ratio 优势**：单属性直接表达意图，可与 min-height/max-height 配合，内容超出时自动扩展（padding hack 内容溢出）。兼容性：Chrome 88+/Firefox 89+/Safari 15+，现代项目可直接用。

  **延伸 A：** aspect-ratio 和 object-fit 配合使用场景？ → 图片容器设 aspect-ratio:1/1 固定正方形，img 设 object-fit:cover 裁剪填满，实现统一尺寸的图片卡片，无需 padding hack 也无需 JS 计算。

- 47. 如何用纯 CSS 实现一个响应式的瀑布流布局？

  **答：** 完整答案：**方案1 CSS columns（最简单）**：`column-count:3; column-gap:16px`，子元素 `break-inside:avoid` 防止跨列断裂。缺点：排列顺序是从上到下再换列（竖向排列），不是从左到右。**方案2 CSS Grid + masonry（最理想，实验性）**：`grid-template-rows:masonry`，Chrome 需开启实验标志，Firefox 部分支持，暂不可用于生产。**方案3 Flexbox 多列模拟**：多个 flex-direction:column 的列容器，JS 分配元素到最短列，严格说需要 JS 辅助。**方案4 Grid + JS 计算 grid-row-end**：纯 CSS 无法实现真正的左到右瀑布流，生产环境推荐 Masonry.js 或 CSS columns（接受竖向排列时）。

  **延伸 A：** CSS columns 瀑布流为什么是竖向排列？如何让用户感知顺序正确？ → columns 本质是报纸分栏，内容从第一列顶部填到底部再换第二列，适合文章/图片流不在意顺序的场景。若需横向顺序（1,2,3 在同一行），只能用 JS 方案或等 masonry 标准落地。

## CSS 新特性（2024~2025）

- 48. CSS 容器查询（Container Queries）是什么？和媒体查询有什么区别？

  **答：** 完整答案：容器查询允许元素根据**父容器尺寸**而非视口尺寸应用样式。用法：父容器设 `container-type:inline-size`（可选 container-name），子元素用 `@container (min-width:400px){}`。**与媒体查询区别**：媒体查询基于视口宽度，同一组件在不同位置（侧边栏/主内容区）宽度不同时无法自适应；容器查询基于组件所在容器宽度，组件真正实现自包含响应式，可复用到任意位置。**container-type 值**：inline-size（监听行内轴宽度，最常用）/size（监听宽高）/normal（仅支持样式查询）。**样式查询**（实验性）：`@container style(--theme:dark){}` 基于 CSS 变量值查询。兼容性：Chrome 105+/Safari 16+/Firefox 110+，可用于生产。

  **延伸 A：** 容器查询和媒体查询可以混用吗？ → 可以，两者互补。媒体查询做页面级布局切换（单列/多列），容器查询做组件级自适应（卡片在窄容器显示紧凑版）。实践：页面骨架用媒体查询，组件内部用容器查询。

- 49. CSS 嵌套（CSS Nesting）是什么？原生嵌套和 Sass 嵌套有什么区别？

  **答：** 完整答案：CSS 原生嵌套允许在选择器内直接写子规则，无需重复父选择器。语法：`.card { color:red; .title { font-size:18px } &:hover { opacity:.8 } }`。**与 Sass 嵌套区别**：1.**& 符号**：Sass 中 & 可拼接字符串（`&-title` 生成 `.card-title`），原生 CSS 中 & 只能作为完整选择器引用，不能拼接；2.**编译时机**：Sass 编译时展开，原生 CSS 浏览器运行时解析；3.**元素选择器嵌套**：原生 CSS 直接嵌套元素选择器需加 `&`（`& p{}` 而非 `p{}`），否则部分浏览器解析有歧义（新规范已放宽）；4.**兼容性**：原生嵌套 Chrome 112+/Safari 16.5+/Firefox 117+，旧浏览器需 PostCSS 转换。

  **延伸 A：** 原生嵌套的 & 和不加 & 有什么区别？ → `& .child` 等价于 `.parent .child`（后代）；`.child` 直接嵌套在新规范中等价于 `& .child`；`&.active` 等价于 `.parent.active`（同一元素加类）；`&:hover` 等价于 `.parent:hover`。& 明确表示对父选择器的引用，建议始终写 & 避免歧义。

- 50. `:has()` 伪类选择器的作用和使用场景？

  **答：** 完整答案：`:has()` 是"关系伪类"，选择**包含特定后代/兄弟的祖先元素**，俗称"父选择器"，CSS 长期缺失的能力。语法：`A:has(B)` 选择包含 B 的 A。**场景**：1.`form:has(input:invalid)` 表单含无效输入时整体标红；2.`li:has(+ li)` 选择非最后一个 li（有下一个兄弟的 li）；3.`.card:has(img)` 有图片的卡片应用不同样式；4.`h2:has(+ p)` 后面紧跟 p 的 h2 加底部间距；5.`body:has(dialog[open])` 模态框打开时禁止 body 滚动（`overflow:hidden`）。**注意**：:has() 内的选择器不增加外部权重，但 :has() 本身权重等于括号内最高权重。兼容性：Chrome 105+/Safari 15.4+/Firefox 121+，可用于生产。

  **延伸 A：** :has() 和 :not() 组合使用？ → `:not(:has(img))` 选择不含图片的元素；`.card:has(:not(button))` 选择含有非 button 子元素的卡片。两者组合可表达复杂的结构条件，替代大量 JS DOM 查询。
