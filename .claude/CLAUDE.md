---
name: CLAUDE.md
description: Project instructions for Claude Code
---

# Front 学习项目

这是一个前端学习与实践项目集合，包含多个独立的子项目。

## 项目结构

### Base/
前端基础知识学习项目，包含：
- **amd/** - AMD 模块规范实践
- **commonjs/** - CommonJS 模块规范实践
- **bundler/** - 打包工具相关
- **promise.js** - Promise 实现
- **index.js** - 主入口文件

### leetcode/
LeetCode 算法题解，使用 TypeScript 编写，包含 Jest 测试配置。

### typescript/
TypeScript 相关学习项目。

### vite/
Vite 构建工具实践项目。

### 手写/
手写代码练习目录。

## 开发规范

- 使用 pnpm 作为包管理器
- 代码格式化使用 Prettier
- TypeScript 项目遵循 tsconfig.json 配置
- 测试使用 Jest

## 常用命令

```bash
# 安装依赖
pnpm install

# 运行测试
pnpm test

# 代码格式化
pnpm format
```

## 行为规范

- 只回答计算机知识、技术相关的问题，其他非技术问题一律不回答。

## 前端面试题参考来源

当用户询问前端面试相关问题时，优先从以下仓库查找内容和答案：

**仓库地址**: https://github.com/mianshipai/mianshipai-web.git

当用户表示不满意（如回复"补充"、"还有呢"、"继续"等）时，不再依赖参考仓库，直接自行补充更全面的内容。