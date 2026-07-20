# BIPO ERP Frontend Scaffold

`bipo-erp-webui` 是 ERP 系统的前端工程脚手架,与后端 [`bipo-erp-poc`](https://github.com/BIPOSVC/bipo-erp-poc)
**分仓协作**:后端保持纯服务端,前端独立演进,通过后端的 **OpenAPI 契约**做类型桥接。

技术栈按「AI Coding 模型当前最擅长/默认生成」+「ERP 中后台契合」两条挑选,目标是让全栈成员
借助 AI 快速产出一致、可维护的中后台页面。

```text
┌──────────────────────────────────────────────────────────────┐
│  bipo-erp-webui(前端)         bipo-erp-poc(后端)          │
│  React + shadcn/ui       ──▶   NestJS + @nestjs/swagger       │
│       ▲  orval 生成            产出 openapi.json               │
│       └──────── 类型化 API client(吃 OpenAPI 契约)──────────┘ │
└──────────────────────────────────────────────────────────────┘
```

## 技术栈

| 层          | 选型                                             |
| ----------- | ------------------------------------------------ |
| 语言 / 框架 | TypeScript + React 19                            |
| 构建        | Vite                                             |
| 路由        | React Router                                     |
| 服务端状态  | TanStack Query                                   |
| 客户端状态  | Zustand                                          |
| 表单 + 校验 | React Hook Form + Zod                            |
| UI          | shadcn/ui + Tailwind CSS(图标 lucide-react)      |
| 数据表格    | TanStack Table(+ shadcn DataTable)               |
| API 客户端  | orval（从后端 OpenAPI 生成）                     |
| 测试        | Vitest + Testing Library + Playwright            |
| 工具链      | pnpm · ESLint · Prettier · Node 22（与后端一致） |

> shadcn/ui 不是依赖库,而是把组件源码复制进 `src/components/ui/`,**由本仓库拥有和维护**。

## 目录结构

```text
.
├── e2e/                          # Playwright E2E
├── src/
│   ├── main.tsx                  # 入口
│   ├── App.tsx                   # Provider（Query）+ Router 装配
│   ├── router.tsx                # 路由表
│   ├── index.css                 # Tailwind + shadcn 主题变量
│   ├── components/
│   │   ├── ui/                    # shadcn 组件（源码归本仓库）
│   │   ├── data-table.tsx         # 通用数据表（TanStack Table）
│   │   └── layout/app-layout.tsx  # 侧边栏布局
│   ├── features/                  # 业务垂直切片（对齐后端 module 思路）
│   │   └── users/                 # 示例：类型 / api / 列表 / 表单
│   ├── pages/                     # 页面
│   ├── lib/                       # cn() / query-client
│   ├── stores/                    # Zustand 客户端状态
│   └── api/generated/             # orval 生成的 API client（gitignore）
├── components.json               # shadcn 配置
├── orval.config.ts               # OpenAPI codegen 配置
└── vite.config.ts
```

## 快速开始

环境:Node.js 22 LTS · pnpm 10

```bash
corepack enable
pnpm install
pnpm dev            # http://localhost:5173
```

首页重定向到 `/dashboard`,`/users` 是最小业务示例(列表 + 新建表单)。

> 当前 `features/users` 使用**内存 Mock 数据层**,脱离后端也能跑起来演示。
> 接后端后用 `pnpm api:gen` 生成的 hooks 替换 `src/features/users/api.ts`。

## 与后端对接（OpenAPI codegen）

```text
1. 启动后端 bipo-erp-poc          → http://localhost:3000/docs-json
2. 前端 pnpm api:gen              → orval 读契约,生成 src/api/generated
3. 用生成的类型化 hooks 替换 mock  → 后端改接口，重新生成，类型对不上当场标红
```

配置见 [orval.config.ts](orval.config.ts);地址通过 `.env` 的 `OPENAPI_URL` 覆盖。

## 常用命令

```bash
pnpm dev            # 开发
pnpm build          # 类型检查 + 生产构建
pnpm preview        # 预览构建产物
pnpm lint           # ESLint
pnpm format         # Prettier 检查
pnpm test           # Vitest 单元/组件测试
pnpm test:watch     # 监听模式
pnpm test:e2e       # Playwright E2E（需先 pnpm exec playwright install）
pnpm api:gen        # 从后端 OpenAPI 生成 API client
pnpm check          # lint + test + build（本地/CI 同一门禁）
```

## 加一个新业务模块（约定）

```text
src/features/<模块>/
├── types.ts          # zod schema + 类型（表单校验的真理源）
├── api.ts            # TanStack Query hooks（后续由 orval 生成替换）
├── <模块>-list.tsx   # 列表（DataTable + columns）
└── <模块>-form.tsx   # 表单（RHF + zodResolver + shadcn Form）
再在 src/pages/ 加页面，src/router.tsx 挂路由。
```

## 当前边界

这是前端工程脚手架,当前重点是验证:目录约定、组件基线(shadcn)、
状态与数据获取分层(Zustand + TanStack Query)、表单校验(RHF + Zod)、
与后端的 OpenAPI 契约对接方式,以及 lint/test/build 质量门禁。

认证授权、国际化、权限路由、主题切换、部署(EKS)等将在具体需求明确后逐步接入。
