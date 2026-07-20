import { describe, expect, it } from 'vitest'
import { createUserSchema } from './types'

describe('createUserSchema', () => {
  it('接受合法输入', () => {
    const result = createUserSchema.safeParse({
      name: 'Ada',
      email: 'ada@bipo.dev',
      status: 'active',
    })
    expect(result.success).toBe(true)
  })

  it('拒绝非法邮箱', () => {
    const result = createUserSchema.safeParse({
      name: 'Ada',
      email: 'not-an-email',
      status: 'active',
    })
    expect(result.success).toBe(false)
  })

  it('拒绝过短姓名', () => {
    const result = createUserSchema.safeParse({ name: 'A', email: 'a@b.dev', status: 'active' })
    expect(result.success).toBe(false)
  })
})
