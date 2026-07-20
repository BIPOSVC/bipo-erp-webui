import { type ColumnDef } from '@tanstack/react-table'
import { DataTable } from '@/components/data-table'
import { useUsers } from './api'
import type { User } from './types'

const statusLabel: Record<User['status'], string> = {
  active: '已激活',
  invited: '已邀请',
  disabled: '已禁用',
}

const columns: ColumnDef<User>[] = [
  { accessorKey: 'name', header: '姓名' },
  { accessorKey: 'email', header: '邮箱' },
  {
    accessorKey: 'status',
    header: '状态',
    cell: ({ row }) => statusLabel[row.original.status],
  },
  {
    accessorKey: 'createdAt',
    header: '创建时间',
    cell: ({ row }) => new Date(row.original.createdAt).toLocaleDateString(),
  },
]

export function UsersList() {
  const { data, isLoading, isError } = useUsers()

  if (isLoading) {
    return <p className="text-muted-foreground text-sm">加载中…</p>
  }
  if (isError) {
    return <p className="text-destructive text-sm">加载失败</p>
  }

  return <DataTable columns={columns} data={data ?? []} emptyText="暂无用户" />
}
