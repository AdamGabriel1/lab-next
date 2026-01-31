'use client'

import { Trash2 } from "lucide-react"
import { deleteTransaction } from "@/projects/financas/actions"
import { useState } from "react"

export default function DeleteButton({ id }: { id: string }) {
    const [isDeleting, setIsDeleting] = useState(false)

    async function handleDelete() {
        if (!confirm("Deseja realmente excluir esta transação?")) return

        setIsDeleting(true)
        try {
            await deleteTransaction(id)
        } catch (err) {
            alert("Erro ao deletar")
            setIsDeleting(false)
        }
    }

    return (
        <button
            onClick={handleDelete}
            disabled={isDeleting}
            className={`p-2 rounded-xl transition-all ${isDeleting
                    ? 'opacity-50 cursor-not-allowed'
                    : 'text-slate-300 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10'
                }`}
        >
            <Trash2 size={16} />
        </button>
    )
}