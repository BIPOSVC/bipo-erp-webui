import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { UserCreateForm } from '@/features/users/user-create-form'
import { UsersList } from '@/features/users/users-list'

export function UsersPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Users</h1>
        <p className="text-muted-foreground">
          示例业务切片:列表(TanStack Query + Table)+ 新建表单(RHF + Zod + shadcn)
        </p>
      </div>
      <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
        <Card>
          <CardHeader>
            <CardTitle>用户列表</CardTitle>
          </CardHeader>
          <CardContent>
            <UsersList />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>新建用户</CardTitle>
          </CardHeader>
          <CardContent>
            <UserCreateForm />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
