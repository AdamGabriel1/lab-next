// components/financas/FinanceChart.tsx
'use client'
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts'
import { useTheme } from 'next-themes'

export default function FinanceChart({ data }: { data: any[] }) {
    const { theme } = useTheme()
    const COLORS = ['#10b981', '#ef4444'];

    return (
        <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                    <Pie
                        data={data}
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={5}
                        dataKey="value"
                        stroke="none"
                    >
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <Tooltip
                        contentStyle={{
                            backgroundColor: theme === 'dark' ? '#0f172a' : '#ffffff',
                            borderColor: theme === 'dark' ? '#1e293b' : '#e2e8f0',
                            borderRadius: '12px',
                            color: theme === 'dark' ? '#f8fafc' : '#0f172a',
                            fontSize: '12px',
                            fontWeight: 'bold'
                        }}
                        itemStyle={{ color: theme === 'dark' ? '#f8fafc' : '#0f172a' }}
                    />
                </PieChart>
            </ResponsiveContainer>
        </div>
    )
}