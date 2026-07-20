import { z } from 'zod'

export const userStatusValues = ['active', 'invited', 'disabled'] as const

export const createUserSchema = z.object({
  name: z.string().min(2, '姓名至少 2 个字符'),
  email: z.email('请输入有效邮箱'),
  status: z.enum(userStatusValues),
})

export type CreateUserInput = z.infer<typeof createUserSchema>

export interface User extends CreateUserInput {
  id: string
  createdAt: string
}
