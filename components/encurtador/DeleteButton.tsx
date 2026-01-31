'use client'
import { deleteLink } from '@/projects/encurtador/actions'
import { useState } from 'react'

export default function DeleteButton({ id }: { id: string }) {
    const [loading, setLoading] = useState(false)

    const handleDelete = async () => {
        if (confirm("Deseja apagar este link permanentemente?")) {
            setLoading(true)
            const res = await deleteLink(id)
            if (res?.error) alert(res.error)
            setLoading(false)
        }
    }

    return (
        <button
            onClick={handleDelete}
            disabled={loading}
            className={`p-3 rounded-xl transition-all ${loading
                ? 'bg-slate-100 dark:bg-slate-800 text-slate-300'
                : 'bg-slate-50 dark:bg-slate-800 text-slate-400 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-500'
                }`}
        >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
        </button>
    )
}