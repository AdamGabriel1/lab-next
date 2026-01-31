// components/citacoes/CopyButton.tsx
'use client'
import { useState } from 'react'

export default function CopyButton({ text }: { text: string }) {
    const [copied, setCopied] = useState(false)

    const handleCopy = async () => {
        await navigator.clipboard.writeText(text)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    return (
        <button
            onClick={handleCopy}
            className="text-[10px] font-bold text-slate-400 dark:text-slate-500 hover:text-blue-500 dark:hover:text-blue-400 uppercase tracking-widest transition-colors flex items-center gap-2"
        >
            {copied ? (
                <span className="text-emerald-500 animate-bounce">✅ Copiado com sucesso!</span>
            ) : (
                <>
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                    </svg>
                    Copiar frase
                </>
            )}
        </button>
    )
}