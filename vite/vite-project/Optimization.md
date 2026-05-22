# 打包产物优化分析报告

> 生成时间：2026-05-22
> 项目：vite-project

## 一、当前打包产物（拆分后）

| 资源 | 大小 | gzip |
|---|---|---|
| dist/index.html | 0.86 kB | 0.39 kB |
| dist/assets/index-BIOIQIke.css | 1.06 kB | 0.46 kB |
| **dist/assets/vendor-49FGoJkB.css** | **568.41 kB** | **62.94 kB** ← 首屏阻塞 |
| dist/assets/Calendar-CYWX0ee8.js | 0.12 kB | 0.11 kB |
| dist/assets/rolldown-runtime-DF2fYuay.js | 0.55 kB | 0.35 kB |
| dist/assets/index-BZTjKhRp.js | 6.71 kB | 2.66 kB |
| dist/assets/vendor-B6lFtsfJ.js | 25.22 kB | 9.35 kB |
| dist/assets/react-vendor-j-3svozX.js | 190.45 kB | 59.88 kB |
| dist/assets/ui-vendor-CzxdnIkV.js | 286.82 kB | 97.62 kB |

**首屏总量（gzip）：~233 kB**，其中 CSS 单文件就有 62.94 kB。

---

## 二、核心问题

### 1. 同时引入两个 UI 库（最致命）

`src/App.tsx:8-9`：

```ts
import { Form, Input } from "antd";
import { Button, Space } from "@arco-design/web-react";
```

两套 CSS reset + design token + 全量组件样式都被打进 `vendor-css`，**568 kB 一半以上来自此**。

### 2. Calendar 假 lazy

```ts
import Calendar from "./components/Calendar";              // 静态
const CalendarTest = lazy(() => import("./components/Calendar")); // 动态
```

静态 import 已经把 Calendar 拉进主 chunk，`lazy` 完全失效。

### 3. `minify: {}` 空对象

rolldown 的 `output.minify` 传空对象，写法不明确，建议显式开启。

### 4. CSS 没按 chunk 拆分

所有库 CSS 合到一个 `vendor.css`，首屏要等 568 kB 下载+解析。

### 5. dayjs 没限制 locale

全量 locale 会被打入。

### 6. `react-vendor` 拆分规则过宽

`/node_modules[\\/]react/` 会把 `react-router`、`react-xxx` 等都吸进来。

---

## 三、优化方案（按收益排序）

### A. 砍掉一个 UI 库（预计 -200 kB+ CSS、-100 kB JS）

保留一个，比如只用 antd：

```ts
import { Form, Input, Button, Space } from "antd";
```

若两个必须共存：
- antd v5/v6 已是 ES Module，按需子组件 import 即可 tree-shaking
- arco 需用 `babel-plugin-import` 或显式子路径 import：
  ```ts
  import Button from '@arco-design/web-react/es/Button';
  ```

### B. 真正按需 + 路由级懒加载

- 删除 `App.tsx:3` 的静态 `import Calendar`，只保留 `lazy`。
- 把重组件（Calendar、DatePicker、Table 等）按路由 `lazy` 拆分。

### C. CSS 按 chunk 拆 + 异步加载

```ts
build: {
  cssCodeSplit: true,
  cssMinify: 'lightningcss',
  chunkSizeWarningLimit: 1000,
  sourcemap: false,
  rolldownOptions: {
    output: {
      minify: { mangle: true, compress: true },
    }
  }
}
```

### D. dayjs 锁定 locale

```ts
import dayjs from 'dayjs/esm';
import 'dayjs/esm/locale/zh-cn';
dayjs.locale('zh-cn');
```

### E. 预压缩（gzip / brotli）

```ts
import compression from 'vite-plugin-compression';

plugins: [
  compression({ algorithm: 'brotliCompress' }),
  compression({ algorithm: 'gzip' }),
]
```

由 nginx 直接送 `.br` / `.gz`，省 CPU。

### F. 拆分策略细化

```ts
codeSplitting: {
  groups: [
    {
      name: "react-vendor",
      test: /node_modules[\\/](react|react-dom|scheduler)[\\/]/,
      priority: 25,
    },
    {
      name: "antd-vendor",
      test: /node_modules[\\/](antd|@ant-design)[\\/]/,
      priority: 20,
    },
    {
      name: "arco-vendor",
      test: /node_modules[\\/]@arco-design[\\/]/,
      priority: 20,
    },
    {
      name: "vendor",
      test: /node_modules/,
      priority: 10,
    },
    {
      name: "common",
      minShareCount: 2,
      minSize: 10000,
      priority: 5,
    },
  ],
}
```

### G. 图标按需 import

```ts
// 不要：
import { IconHome } from '@arco-design/web-react/icon';

// 要：
import IconHome from '@arco-design/web-react/icon/react-icon/IconHome';
```

### H. 其他可选项

- 开启 `build.reportCompressedSize: false` 加速构建
- 静态资源走 CDN（`build.assetsDir` + `base`）
- 路由级 React `<Suspense>` + skeleton
- 大图片用 `webp` / `avif`，结合 `vite-plugin-imagemin` 已配置

---

## 四、预期效果

| 指标 | 优化前 | 优化后 |
|---|---|---|
| vendor-css | 568 kB | **~200 kB** |
| ui-vendor.js | 286 kB | **80 kB 首屏 + 200 kB 懒加载** |
| 首屏 gzip 总量 | ~233 kB | **~70 kB** |
| FCP（估算） | 2.5 s | **<1 s** |

---

## 五、实施步骤

1. **第一步（高收益、低风险）**
   - 修复 `App.tsx` 静态 import 误用
   - 锁定 dayjs locale
   - 拆分规则细化
2. **第二步（高收益、需评估）**
   - 砍掉一个 UI 库（推荐保留 antd，因生态更全）
3. **第三步（锦上添花）**
   - 加 `vite-plugin-compression`
   - 图标按子路径 import
   - 路由级懒加载
