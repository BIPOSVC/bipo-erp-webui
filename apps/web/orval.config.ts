import { defineConfig } from 'orval'

// 从后端 bipo-erp-poc 的 OpenAPI 契约生成类型化 API client + TanStack Query hooks。
// 后端启动后:openapi 文档在 http://localhost:3000/docs-json
// 生成命令:pnpm api:gen
export default defineConfig({
  erp: {
    input: {
      target: process.env.OPENAPI_URL ?? 'http://localhost:3000/docs-json',
    },
    output: {
      mode: 'tags-split',
      target: 'src/api/generated',
      schemas: 'src/api/generated/model',
      client: 'react-query',
      httpClient: 'fetch',
      baseUrl: '/api/v1',
      clean: true,
      override: {
        query: {
          useQuery: true,
          useMutation: true,
        },
      },
    },
  },
})
