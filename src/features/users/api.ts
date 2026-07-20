import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import type { CreateUserInput, User } from './types'

// ─────────────────────────────────────────────────────────────────────────
// 临时 Mock 数据层(让脚手架脱离后端也能跑起来演示)。
// 接后端后:执行 `pnpm api:gen` 从后端 OpenAPI 契约生成类型化 hooks
// (见 orval.config.ts → src/api/generated),用生成的 hooks 替换本文件。
// ─────────────────────────────────────────────────────────────────────────

let mockUsers: User[] = [
  {
    id: '1',
    name: 'Ada Lovelace',
    email: 'ada@bipo.dev',
    status: 'active',
    createdAt: '2026-07-01T09:00:00.000Z',
  },
  {
    id: '2',
    name: 'Alan Turing',
    email: 'alan@bipo.dev',
    status: 'invited',
    createdAt: '2026-07-05T09:00:00.000Z',
  },
]

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

async function fetchUsers(): Promise<User[]> {
  await delay(300)
  return [...mockUsers]
}

async function createUser(input: CreateUserInput): Promise<User> {
  await delay(300)
  const user: User = {
    ...input,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
  }
  mockUsers = [user, ...mockUsers]
  return user
}

export const usersQueryKey = ['users'] as const

export function useUsers() {
  return useQuery({
    queryKey: usersQueryKey,
    queryFn: fetchUsers,
  })
}

export function useCreateUser() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: createUser,
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: usersQueryKey })
    },
  })
}
