## vite

- 启动快，为啥
  > 开发环境使用浏览器原生ESM，让浏览器自己按需加载，一个import就是一个请求，不会和webpack一样，先一次性全部打包，然后再加载

### vite.config.ts 配置

#### 入口文件

- root

#### css 配置

- css

##### 预处理

##### 模块化

##### postcss，后处理，将px转化为rem，添加一些-mo-webkit，解决兼容性问题

安装eslint，prettierrc styleint
解决版本问题，格式化问题，样式问题，运行时候检查

### 静态资源处理

支持 图片，SVG，WASM，视频，等等，
打包可以将静态资源单独打包或者，独立文件，一般是4k为分界线
图片压缩
合并svg雪碧图片，减少大量http 请求

### 预构建

在开发阶段，将node_modules中的依赖 提前打包成ES Module 形式储存在node_module/.vite中, 这是vite 启动快的核心之一

为啥要与构建
vite 开发走原生 ESM 形式,浏览器直接import
问题

1. 模块格式不统一
2. 依赖请求瀑布，将整个包合并成一个文件，一次请求搞定

步骤：

1. 从入口文件出发，可以自定义，在optimizeDeps/entries, 默认就是index.html 文件，找出所有import的依赖
2. 使用esbuild 进行打包，CJS/UMD -> ESM，多文件 -> 合并单个文件
3. 写入缓存 node_modules/.vite/deps
4. 生成\_metadata，记录hash值和依赖的映射
5. 请求重写，改写依赖的引入路径

### EsBuild 插件

- 接受一个对象，
- import 正则匹配 导入路径
  钩子
  build.resolve({filter: //}, (args) => ({}))
  build.onLoad({filter: //}, (args) => {})
  build.onEnd((buildResult)) //可以拿到所有打包结果

### Rollup

执行周期

build阶段

1. `options` 配置转换，得到处理后的配置对象
2. 调用 `buildStart`，正式开始构建流程
3. 从入口文件开始，调用 `resolveId` 解析文件路径，把 import 'foo' 解析成绝对路径
4. 调用 `load` 加载 模块内容
5. 再执行 `transform`，对文件进行转换，比如jsx -> js，cjs -> esm
6. 解析AST, 调用 `moduleParsed`
   ：查看所有import内容，静态import回到 第3步，动态import 使用 resolveDynamicImport，完成了静态分析，标记了所有未被使用的代码
7. 所有import 解析完成，rollUp执行`build end`，模块图构建完成

output 阶段

1. output 钩子
2. `renderStart` 开始
3. `banner` `footer` `intro` `outro` 头部和尾部插入自定义内容
4. 处理动态import，如import(), `renderDynamicImport`
5. 代码拆分
6. 生成 chunk前，`augmentChunkHash` 影响hash值计算
7. `renderChunk`，可以操作最后生成的产物
8. `generateBundle` 生成在内存中，所有打包后的代码，静态资源文件
9. `writeBundle` 写入磁盘
10. `closeBundle`

#### 插件

- 串行
- 并行
- 异步
- 同步
- first

#### 阶段

1. input
2. build
3. output

#### 配置

- 入口 input
  > 多个
- 出口 output
  > 多个

#### 打包

可以输出cjs，但是不能打包cjs的代码 比如lodash 对于一些commonjs 的包，不支持resolve，因此需要安装插件
`pnpm i @rollup/plugin-node-resolve @rollup/plugin-commonjs `

#### Tree shaking

- 消除无用代码

vite build
↓
Rollup 接管
↓
入口分析 → 模块图构建 → tree-shaking
↓
code split（按动态 import / 多入口）
↓
插件链处理资源（CSS/图片/Worker）
↓
esbuild minify（仅压缩）
↓
输出 dist/

### vite 插件

- 虚拟模块
- 扫描pages下的目录，动态插件 route 配置文件

和rollUp类似，但是有自己定制的一些钩子
