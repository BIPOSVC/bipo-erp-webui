# BIPO ERP Frontend (Monorepo)

`bipo-erp-webui` 是 ERP 系统的前端 **monorepo**,与后端 [`bipo-erp-poc`](https://github.com/BIPOSVC/bipo-erp-poc)
**分仓协作**:后端保持纯服务端,前端独立部署;前端通过后端的 **OpenAPI 契约**做类型桥接。

前端内部采用 monorepo,是为了**跨多个前端 app 复用组件**:共享的 shadcn/ui 组件沉淀在
`packages/ui`(`@workspace/ui`),各应用放在 `apps/*`。布局参考
[shadcn/ui monorepo](https://ui.shadcn.com/docs/monorepo),并适配到 Vite。

```text
┌──────────────────────────────────────────────────────────────┐
│  bipo-erp-webui(前端 monorepo)     bipo-erp-poc(后端)      │
│  apps/web + packages/ui       ──▶    NestJS + @nestjs/swagger  │
│       ▲  orval 生成                  产出 openapi.json          │
│       └──────── 类型化 API client(吃 OpenAPI 契约)──────────┘ │
└──────────────────────────────────────────────────────────────┘
```

## 技术栈

| 层          | 选型                                             |
| ----------- | ------------------------------------------------ |
| 语言 / 框架 | TypeScript + React 19                            |
| 构建        | Vite                                             |
| Monorepo    | pnpm workspace + Turborepo                       |
| 路由        | React Router                                     |
| 服务端状态  | TanStack Query                                   |
| 客户端状态  | Zustand                                          |
| 表单 + 校验 | React Hook Form + Zod                            |
| UI          | shadcn/ui + Tailwind CSS(图标 lucide-react）     |
| 数据表格    | TanStack Table（+ shadcn DataTable）             |
| API 客户端  | orval（从后端 OpenAPI 生成）                     |
| 测试        | Vitest + Testing Library + Playwright            |
| 工具链      | pnpm · ESLint · Prettier · Node 22（与后端一致） |

## 目录结构

```text
bipo-erp-webui/
├── apps/
│   └── web/                        # Vite 应用(可再加 admin / portal 等)
│       ├── src/
│       │   ├── main/App/router      # 入口 + Provider + 路由
│       │   ├── index.css            # @import '@workspace/ui/globals.css'
│       │   ├── components/layout/    # 应用级组件
│       │   ├── features/             # 业务垂直切片(users 示例)
│       │   ├── pages/ lib/ stores/
│       │   └── api/generated/        # orval 生成(gitignore)
│       ├── components.json           # shadcn:aliases 指向 @workspace/ui
│       ├── vite.config.ts  tsconfig.*  orval.config.ts
├── packages/
│   └── ui/                          # @workspace/ui —— 共享组件库(复用核心)
│       ├── src/
│       │   ├── components/           # shadcn 组件 + data-table
│       │   ├── lib/utils.ts          # cn()
│       │   ├── hooks/
│       │   └── styles/globals.css    # Tailwind + 主题变量 + @source
│       ├── components.json  package.json(exports)  tsconfig.json
├── package.json                     # root:turbo 脚本
├── pnpm-workspace.yaml  turbo.json
└── .prettierrc / .gitignore / .nvmrc …
```

## 快速开始

环境:Node.js 22 LTS · pnpm 10

```bash
corepack enable
pnpm install
pnpm dev            # turbo 启动 apps/web → http://localhost:5173
```

首页重定向到 `/dashboard`,`/users` 是最小业务示例(列表 + 新建表单)。

> 当前 `apps/web` 的 `features/users` 使用**内存 Mock 数据层**,脱离后端也能跑。
> 接后端后用 `pnpm --filter @app/web api:gen` 生成的 hooks 替换 `features/users/api.ts`。

## 共享组件怎么用 / 怎么加

```text
apps/web 里直接从 @workspace/ui 引入:
  import { Button } from '@workspace/ui/components/button'
  import { cn } from '@workspace/ui/lib/utils'

加一个新的共享 shadcn 组件(会装进 packages/ui):
  cd apps/web
  pnpm dlx shadcn@latest add <component>
```

> `packages/ui` 里的组件**源码归本仓库所有**,可自由修改;应用只依赖 `@workspace/ui`,
> 后续新增 app(admin/portal)即可零成本复用同一套组件与主题。

## 与后端对接（OpenAPI codegen）

```text
1. 启动后端 bipo-erp-poc          → http://localhost:3000/docs-json
2. pnpm --filter @app/web api:gen  → orval 读契约,生成 apps/web/src/api/generated
3. 用生成的类型化 hooks 替换 mock  → 后端改接口,重新生成,类型对不上当场标红
```

## 常用命令(root)

```bash
pnpm dev            # turbo run dev(启动 apps/web)
pnpm build          # turbo run build(类型检查 + 生产构建)
pnpm lint           # turbo run lint
pnpm test           # turbo run test
pnpm check          # turbo run check(各包 lint/test/build/tsc,本地/CI 同一门禁)
pnpm format         # Prettier 检查
```

单独对某个包操作用 `pnpm --filter @app/web <script>` 或 `pnpm --filter @workspace/ui <script>`。

## 当前边界

前端 monorepo 骨架,当前验证:`apps/web` + `packages/ui` 的组件复用、Vite 下的
Tailwind 跨包内容扫描、shadcn 组件基线、状态与数据获取分层、表单校验、OpenAPI 对接,
以及 turbo 编排的 lint/test/build 质量门禁。

认证授权、国际化、权限路由、主题切换、第二个 app(admin/portal)、部署(EKS)等
将按需接入。
