'use client'
import { useEffect } from 'react'
import { AlertTriangle, RefreshCw } from 'lucide-react'

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    useEffect(() => {
        console.error('Application error:', error)
    }, [error])

    return (
        <div className="flex items-center justify-center min-h-screen bg-slate-50 dark:bg-slate-950 p-6">
            <div className="max-w-md w-full bg-white dark:bg-slate-900 p-12 rounded-[3rem] border border-slate-200 dark:border-slate-800 shadow-2xl text-center">
                <div className="bg-red-500/10 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <AlertTriangle size={40} className="text-red-500" />
                </div>

                <h2 className="text-3xl font-black text-slate-900 dark:text-white mb-4 tracking-tighter uppercase italic">
                    Erro Detectado
                </h2>

                <p className="text-slate-500 dark:text-slate-400 mb-8 text-sm font-medium">
                    Ocorreu um erro inesperado no sistema. Tente recarregar a página.
                </p>

                <button
                    onClick={reset}
                    className="bg-slate-900 dark:bg-blue-600 text-white px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-blue-600 dark:hover:bg-blue-700 transition-all shadow-xl active:scale-95 flex items-center gap-3 mx-auto"
                >
                    <RefreshCw size={16} />
                    Tentar Novamente
                </button>
            </div>
        </div>
    )
}
