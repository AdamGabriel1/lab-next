'use client'
import { useTransition } from 'react'
import { refreshQuote } from '@/projects/citacoes/actions'
import { RotateCw } from 'lucide-react'

export default function RefreshButton() {
    const [isPending, startTransition] = useTransition()

    return (
        <button
            onClick={() => startTransition(() => refreshQuote())}
            disabled={isPending}
            className={`
                group flex items-center gap-3 bg-slate-900 dark:bg-white text-white dark:text-slate-900 
                px-10 py-5 rounded-2xl font-black text-[11px] uppercase tracking-[0.2em] 
                transition-all shadow-2xl hover:shadow-blue-500/20 active:scale-95
                ${isPending ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-600 dark:hover:bg-blue-50'}
            `}
        >
            <RotateCw size={16} className={`${isPending ? 'animate-spin' : 'group-hover:rotate-180 transition-transform duration-500'}`} />
            {isPending ? 'Buscando...' : 'Nova Citação'}
        </button>
    )
}