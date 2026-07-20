import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@workspace/ui/components/card'

const stats = [
  { label: '用户', value: '2', hint: '示例数据' },
  { label: '报价单', value: '128', hint: '接后端 quotations 模块' },
  { label: '合同', value: '34', hint: '示例数据' },
]

export function DashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Dashboard</h1>
        <p className="text-muted-foreground">ERP 前端脚手架 · 最小示例</p>
      </div>
      <div className="grid gap-4 sm:grid-cols-3">
        {stats.map((s) => (
          <Card key={s.label}>
            <CardHeader>
              <CardDescription>{s.label}</CardDescription>
              <CardTitle className="text-3xl">{s.value}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-xs">{s.hint}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
