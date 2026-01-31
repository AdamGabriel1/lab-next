'use client'
import { useState } from 'react'
import { Copy, Check } from 'lucide-react'

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
            className="group flex items-center gap-2 text-[10px] font-black text-slate-400 dark:text-slate-500 hover:text-blue-600 dark:hover:text-blue-400 uppercase tracking-[0.2em] transition-all"
        >
            <div className={`p-2 rounded-lg transition-colors ${copied ? 'bg-emerald-500/10 text-emerald-500' : 'bg-slate-100 dark:bg-slate-800 group-hover:bg-blue-500/10'}`}>
                {copied ? <Check size={14} /> : <Copy size={14} />}
            </div>
            <span>{copied ? 'Copiado!' : 'Copiar'}</span>
        </button>
    )
}