'use client'

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts'

interface FinanceChartProps {
    data: { name: string; value: number }[]
}

const COLORS = ['#10b981', '#ef4444'] // Emerald-500 e Red-500

export default function FinanceChart({ data }: FinanceChartProps) {
    // Se não houver dados, exibe um placeholder para evitar erros de renderização
    if (data.length === 0) {
        return (
            <div className="h-[300px] flex items-center justify-center border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-[2.5rem] text-slate-400 text-xs font-black uppercase tracking-widest">
                Sem dados para o gráfico
            </div>
        )
    }

    return (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-[2.5rem] shadow-sm">
            <h3 className="font-black text-xs uppercase text-slate-400 italic mb-4 px-2">Distribuição</h3>

            {/* O segredo está no minHeight e no aspect */}
            <div className="w-full h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={data}
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={80}
                            paddingAngle={8}
                            dataKey="value"
                        >
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} stroke="none" />
                            ))}
                        </Pie>
                        <Tooltip
                            contentStyle={{ borderRadius: '16px', border: 'none', fontWeight: 'bold' }}
                        />
                        <Legend verticalAlign="bottom" height={36} />
                    </PieChart>
                </ResponsiveContainer>
            </div>
        </div>
    )
}