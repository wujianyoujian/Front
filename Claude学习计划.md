# Claude 学习计划

> 从零开始系统学习 Claude，涵盖 CLI 使用、Prompt Engineering、API 开发、工具调用、Agent 构建

---

## 第一阶段：基础入门（1-2 周）

### Week 1：Claude Code CLI 基础

#### Day 1-2：安装与环境配置

**学习内容：**
- Claude Code 安装方式（native/homebrew/winget）
- 首次登录与认证
- 基本命令使用
- 理解工作目录概念

**实践任务：**
```bash
# 安装 Claude Code
claude

# 基本命令练习
claude "解释这个项目的结构"
claude "列出所有 TypeScript 文件"
claude "帮我创建一个 README.md"
```

**资源：**
- [Claude Code Overview](https://code.claude.com/docs/en/overview)
- [Quickstart Guide](https://code.claude.com/docs/en/quickstart)

---

#### Day 3-4：文件操作与代码理解

**学习内容：**
- Read/Edit/Write 工具的使用
- Glob/Grep 搜索文件和内容
- 理解 Claude 如何分析代码库
- Bash 命令执行

**实践任务：**
```bash
# 文件搜索练习
claude "找出项目中所有的 .ts 文件"
claude "搜索所有包含 'export' 的行"

# 文件编辑练习
claude "给 leetcode/src 目录添加一个新文件 100.相同的树.ts"
claude "修复 vite/vite-project/src/App.tsx 中的类型错误"

# 代码理解练习
claude "解释 Base/promise.js 的实现原理"
claude "分析 leetcode/src/practice 目录的代码结构"
```

---

#### Day 5-7：Git 工作流与项目管理

**学习内容：**
- Git commit/create branch/push
- Pull request 创建
- Git status/diff 查看
- CLAUDE.md 配置文件

**实践任务：**
```bash
# Git 练习
claude "创建一个新分支 feature/test-add"
claude "提交当前更改并写一个描述性的 commit message"
claude "查看最近的 git 历史"

# CLAUDE.md 练习
claude "帮我创建一个 CLAUDE.md 文件，包含项目规范"
```

**学习产出：**
- 完成一个完整的 git 工作流练习
- 创建项目的 CLAUDE.md 文件

---

### Week 2：Prompt Engineering 基础

#### Day 1-3：提示词基础技巧

**学习内容：**
- 清晰性原则（Be Clear）
- 具体性原则（Be Specific）
- 结构化提示
- 角色设定
- 上下文提供

**核心技巧：**
```
# 1. 明确目标
"帮我实现一个二分查找算法" ❌
"用 TypeScript 实现二分查找，包含类型定义、边界处理、测试用例" ✅

# 2. 提供上下文
"这段代码有什么问题？" ❌
"这段代码在处理空数组时会报错，帮我找出原因并修复" ✅

# 3. 结构化指令
步骤 1：分析现有代码
步骤 2：识别问题
步骤 3：提出修复方案
步骤 4：实现修复
步骤 5：验证结果
```

**实践任务：**
- 完成官方 Prompt Engineering 交互教程第 1-5 章
- [AWS Workshop](https://catalog.us-east-1.prod.workshops.aws/workshops/0644c9e9-5b82-45f2-8835-3b5aa30b1848/en-US)

---

#### Day 4-5：高级提示词技巧

**学习内容：**
- Chain of Thought（思维链）
- Few-shot prompting（示例引导）
- Step-by-step reasoning
- Self-correction（自我修正）
- Output format control

**技巧示例：**
```
# Chain of Thought
"请一步步思考：1) 先分析问题 2) 设计方案 3) 实现代码 4) 测试验证"

# Few-shot
"参考以下示例风格：
示例1: [代码A]
示例2: [代码B]
按照相同风格写出 [代码C]"

# Output format
"输出格式要求：
1. 代码块使用 TypeScript
2. 添加详细注释
3. 包含测试用例"
```

---

#### Day 6-7：实践练习

**实践任务：**
```
# 练习 1：复杂任务分解
claude "分析 leetcode 目录的所有算法，按难度分类，生成学习路线"

# 练习 2：代码重构
claude "重构 Base/promise.js，使其更易读，保持功能不变"

# 练习 3：文档生成
claude "为 vite/vite-project 生成详细的技术文档，包括架构说明和使用指南"
```

---

## 第二阶段：API 开发（2-3 周）

### Week 3：Claude API 基础

#### Day 1-2：API 认证与基础调用

**学习内容：**
- 获取 API Key
- Python SDK 安装
- 基本消息发送
- 理解 models 参数

**代码实践：**
```python
# 安装 SDK
pip install anthropic

# 基本调用
import anthropic

client = anthropic.Anthropic(api_key="your-key")

message = client.messages.create(
    model="claude-sonnet-4-6",
    max_tokens=1024,
    messages=[{"role": "user", "content": "Hello"}]
)
print(message.content)
```

**资源：**
- [Anthropic API Fundamentals Course](https://github.com/anthropics/courses/tree/master/anthropic_api_fundamentals)

---

#### Day 3-4：参数配置与响应处理

**学习内容：**
- max_tokens 控制输出长度
- temperature 控制随机性（0-1）
- system prompt 系统提示
- streaming 流式响应

**代码实践：**
```python
# System prompt
message = client.messages.create(
    model="claude-sonnet-4-6",
    max_tokens=2048,
    system="你是一个 TypeScript 专家，专注于代码质量",
    messages=[{"role": "user", "content": "优化这段代码"}]
)

# Streaming
with client.messages.stream(
    model="claude-sonnet-4-6",
    max_tokens=1024,
    messages=[{"role": "user", "content": "写一个故事"}]
) as stream:
    for text in stream.text_stream:
        print(text, end="", flush=True)
```

---

#### Day 5-7：多模态与错误处理

**学习内容：**
- 图片输入处理
- 错误类型与处理
- Rate limiting
- Retry 策略

**代码实践：**
```python
# 图片输入
message = client.messages.create(
    model="claude-sonnet-4-6",
    max_tokens=1024,
    messages=[
        {
            "role": "user",
            "content": [
                {"type": "image", "source": {"type": "base64", "media_type": "image/png", "data": image_data}},
                {"type": "text", "text": "描述这张图片"}
            ]
        }
    ]
)

# 错误处理
from anthropic import APIError, RateLimitError

try:
    response = client.messages.create(...)
except RateLimitError:
    # 等待并重试
    time.sleep(60)
except APIError as e:
    print(f"API Error: {e}")
```

---

### Week 4：API 实战项目

#### 项目 1：智能代码审查工具

**目标：** 构建 CLI 工具，自动审查代码质量

**功能：**
- 分析代码文件
- 检测潜在问题
- 提供改进建议
- 生成审查报告

**实现步骤：**
```python
# 1. 文件读取
def read_file(path):
    with open(path) as f:
        return f.read()

# 2. API 调用审查
def review_code(code, language):
    response = client.messages.create(
        model="claude-sonnet-4-6",
        max_tokens=2048,
        system="你是一个代码审查专家，关注代码质量、性能、安全性",
        messages=[{
            "role": "user",
            "content": f"审查以下 {language} 代码，指出问题并给出改进建议：\n{code}"
        }]
    )
    return response.content[0].text

# 3. 批量处理
def review_project(directory):
    for file in glob.glob(f"{directory}/**/*.ts", recursive=True):
        code = read_file(file)
        report = review_code(code, "TypeScript")
        save_report(file, report)
```

---

#### 项目 2：文档自动生成器

**目标：** 为代码自动生成文档

**功能：**
- 分析函数/类
- 生成 API 文档
- 创建使用示例

---

## 第三阶段：工具调用与高级功能（2-3 周）

### Week 5：Tool Use 基础

#### Day 1-3：工具定义与调用

**学习内容：**
- 工具定义 schema
- tool_choice 参数
- 工具调用流程
- 多工具协作

**代码实践：**
```python
# 定义工具
tools = [
    {
        "name": "get_weather",
        "description": "获取指定城市的天气",
        "input_schema": {
            "type": "object",
            "properties": {
                "city": {"type": "string", "description": "城市名称"}
            },
            "required": ["city"]
        }
    },
    {
        "name": "search_code",
        "description": "在项目中搜索代码",
        "input_schema": {
            "type": "object",
            "properties": {
                "query": {"type": "string"},
                "file_type": {"type": "string"}
            },
            "required": ["query"]
        }
    }
]

# 调用
response = client.messages.create(
    model="claude-sonnet-4-6",
    max_tokens=1024,
    tools=tools,
    messages=[{"role": "user", "content": "北京今天天气怎么样？"}]
)

# 处理工具调用
if response.stop_reason == "tool_use":
    for block in response.content:
        if block.type == "tool_use":
            result = execute_tool(block.name, block.input)
            # 继续对话...
```

---

#### Day 4-5：复杂工具场景

**学习内容：**
- 工具链式调用
- 并行工具执行
- 错误处理
- 工具结果缓存

---

#### Day 6-7：实践项目

**项目：智能代码助手**

```python
# 定义多个工具
tools = [
    {"name": "read_file", ...},
    {"name": "write_file", ...},
    {"name": "run_tests", ...},
    {"name": "git_commit", ...},
]

# Claude 可以自主决定调用哪些工具
response = client.messages.create(
    model="claude-sonnet-4-6",
    tools=tools,
    messages=[{
        "role": "user",
        "content": "修复 leetcode/src/26.test.ts 的测试失败问题"
    }]
)
```

---

### Week 6：Prompt Evaluations

#### Day 1-3：提示词评估基础

**学习内容：**
- 为什么需要评估
- 评估指标设计
- 测试数据集创建
- 自动化评估流程

**实践：**
```python
# 评估示例
test_cases = [
    {"input": "代码A", "expected_output": "修复方案A"},
    {"input": "代码B", "expected_output": "修复方案B"},
]

def evaluate_prompt(prompt, test_cases):
    results = []
    for case in test_cases:
        response = client.messages.create(
            model="claude-sonnet-4-6",
            messages=[{"role": "user", "content": prompt + case["input"]}]
        )
        score = calculate_similarity(response.content, case["expected_output"])
        results.append(score)
    return results
```

---

#### Day 4-7：评估优化实践

**学习内容：**
- A/B 测试提示词
- 迭代优化流程
- 生产环境监控

---

## 第四阶段：Agent SDK 与高级应用（3-4 周）

### Week 7-8：Agent SDK 基础

#### Day 1-3：Agent 概念与架构

**学习内容：**
- 什么是 Agent
- Agent vs 普通 API 调用
- Agent SDK 架构
- 工具权限控制

**代码实践：**
```python
from claude_agent_sdk import Agent, Tool

# 创建 Agent
agent = Agent(
    model="claude-sonnet-4-6",
    tools=[
        Tool(name="search", handler=search_handler),
        Tool(name="edit", handler=edit_handler),
    ],
    permissions=["read", "write"]
)

# 运行 Agent
result = agent.run("重构项目的目录结构")
```

---

#### Day 4-7：多 Agent 协作

**学习内容：**
- Agent 编排
- 任务分解与分配
- 结果合并
- 并行执行

---

### Week 9：高级应用开发

#### 项目 1：智能 PR 审查系统

**功能：**
- 自动审查 PR
- 检测代码问题
- 生成审查评论
- CI/CD 集成

---

#### 项目 2：自动化文档维护

**功能：**
- 监控代码变更
- 自动更新文档
- 保持文档同步

---

## 第五阶段：实战与深化（持续）

### 长期实践项目

#### 1. 个人代码助手

**目标：** 构建专属的代码助手，集成到日常工作流

**功能清单：**
- 代码审查
- 测试生成
- 文档维护
- Git 操作
- 项目分析

---

#### 2. 团队协作工具

**目标：** 构建团队共享的 AI 工具

**功能清单：**
- PR 自动审查
- 代码规范检查
- 自动化报告
- 任务分配建议

---

### 持续学习资源

| 资源 | 用途 | 频率 |
|------|------|------|
| [Claude Developers Discord](https://anthropic.com/discord) | 社区交流、问题讨论 | 每周 |
| [GitHub Issues](https://github.com/anthropics/claude-code/issues) | 查看最新问题、解决方案 | 每周 |
| [官方博客](https://anthropic.com/blog) | 新功能、最佳实践 | 每月 |
| [Real World Prompting](https://github.com/anthropics/courses/tree/master/real_world_prompting) | 复杂场景案例 | 项目时 |

---

## 学习检查清单

### 第一阶段完成标准
- [ ] 熟练使用 Claude Code CLI 基本命令
- [ ] 完成官方 Prompt Engineering 教程
- [ ] 能编写清晰、结构化的提示词
- [ ] 完成至少 3 个代码编辑任务

### 第二阶段完成标准
- [ ] 能独立调用 Claude API
- [ ] 掌握参数配置（tokens, temperature, system）
- [ ] 实现流式响应
- [ ] 完成代码审查工具项目

### 第三阶段完成标准
- [ ] 定义并使用多个工具
- [ ] 实现工具链式调用
- [ ] 能评估和优化提示词
- [ ] 完成智能助手项目

### 第四阶段完成标准
- [ ] 使用 Agent SDK 构建自定义 Agent
- [ ] 实现多 Agent 协作
- [ ] 完成 PR 审查系统项目
- [ ] 能部署到生产环境

### 第五阶段完成标准
- [ ] 有长期运行的个人助手项目
- [ ] 参与社区交流
- [ ] 能解决复杂实际问题
- [ ] 持续优化和迭代

---

## 附录：常用命令速查

### Claude Code CLI
```bash
# 基本使用
claude "描述任务"

# 查看帮助
claude --help

# 指定模型
claude --model claude-opus-4-6 "复杂任务"

# 非交互模式
claude -p "一次性任务"

# 后台运行
claude "长期任务" &
```

### Python API
```python
# 基本调用
client.messages.create(model="...", messages=[...])

# 流式响应
client.messages.stream(model="...", messages=[...])

# 工具调用
client.messages.create(model="...", tools=[...], messages=[...])
```

### 提示词模板
```
# 代码审查
"审查以下代码，关注：1) 性能 2) 安全 3) 可读性，给出具体改进建议：\n{code}"

# 代码生成
"用 {language} 实现 {功能}，要求：\n1. 类型安全\n2. 包含测试\n3. 详细注释"

# 问题诊断
"以下代码出现 {错误描述}，请：\n1. 分析原因\n2. 提出修复方案\n3. 实现修复\n代码：\n{code}"
```