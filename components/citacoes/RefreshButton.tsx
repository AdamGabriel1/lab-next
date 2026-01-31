// components/citacoes/RefreshButton.tsx
'use client'
import { useTransition } from 'react'
import { refreshQuote } from '@/projects/citacoes/actions'

export default function RefreshButton() {
    const [isPending, startTransition] = useTransition()

    return (
        <button
            onClick={() => startTransition(() => refreshQuote())}
            disabled={isPending}
            className={`
                bg-slate-900 dark:bg-blue-600 text-white px-10 py-4 rounded-full 
                font-black text-[10px] uppercase tracking-[0.2em] transition-all shadow-lg
                ${isPending ? 'opacity-50 scale-95 cursor-not-allowed' : 'hover:bg-blue-600 dark:hover:bg-blue-700 active:scale-95'}
            `}
        >
            {isPending ? 'Buscando sabedoria...' : 'Nova Citação'}
        </button>
    )
}