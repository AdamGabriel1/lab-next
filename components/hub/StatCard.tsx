'use client'
import { motion } from 'framer-motion'
import { TrendingUp } from 'lucide-react'

export default function StatCard({ title, value, unit, color, trend }: any) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ y: -5 }}
            className="bg-white dark:bg-slate-900 p-8 rounded-[3rem] border border-slate-200 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none overflow-hidden relative transition-all group"
        >
            {/* Barra de Progresso Lateral */}
            <div className={`${color} w-1.5 h-12 absolute left-0 top-1/2 -translate-y-1/2 rounded-r-full group-hover:h-20 transition-all duration-500`} />

            <div className="flex justify-between items-start mb-6">
                <p className="text-[10px] font-black uppercase text-slate-400 dark:text-slate-500 tracking-[0.3em]">
                    {title}
                </p>
                <div className="flex items-center gap-1 text-emerald-500">
                    <TrendingUp size={12} />
                    <span className="text-[9px] font-black uppercase">{trend}</span>
                </div>
            </div>

            <div className="space-y-1">
                <h2 className="text-5xl font-black text-slate-900 dark:text-white tracking-tighter leading-none">
                    {value}
                </h2>
                <p className="text-[10px] font-black text-slate-300 dark:text-slate-600 uppercase tracking-[0.2em]">
                    {unit}
                </p>
            </div>

            {/* Decoração Tech de Fundo */}
            <div className={`absolute -right-4 -bottom-4 w-24 h-24 ${color} opacity-[0.03] dark:opacity-[0.1] blur-2xl rounded-full group-hover:scale-150 transition-transform duration-700`} />
        </motion.div>
    )
}