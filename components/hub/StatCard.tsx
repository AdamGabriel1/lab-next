'use client'
import { motion } from 'framer-motion'

export default function StatCard({ title, value, unit, color }: any) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden relative transition-all duration-300 hover:shadow-2xl hover:-translate-y-1"
        >
            <div className={`${color} w-2 h-16 absolute left-0 top-1/2 -translate-y-1/2 rounded-r-full shadow-lg`} />

            <p className="text-[10px] font-black uppercase text-slate-400 dark:text-slate-500 tracking-[0.2em] mb-4">
                {title}
            </p>

            <div className="flex items-baseline gap-2 mb-2">
                <h2 className="text-4xl font-black text-slate-900 dark:text-white tracking-tighter">
                    {value}
                </h2>
            </div>

            <p className="text-[10px] font-black text-slate-300 dark:text-slate-600 uppercase tracking-widest">
                {unit}
            </p>

            {/* Brilho neon de fundo */}
            <div className={`absolute -right-6 -bottom-6 w-32 h-32 ${color} opacity-[0.05] dark:opacity-[0.15] blur-3xl rounded-full`} />
        </motion.div>
    )
}