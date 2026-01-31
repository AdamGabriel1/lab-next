// components/financas/TransactionForm.tsx
'use client'
import { addTransaction } from '@/projects/financas/actions'
import { useRef } from 'react'

export default function TransactionForm() {
    const formRef = useRef<HTMLFormElement>(null)

    const inputClasses = "p-3 rounded-xl border border-slate-100 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 outline-none focus:border-emerald-500 transition-colors text-sm placeholder:text-slate-400"

    return (
        <form
            ref={formRef}
            action={async (formData) => {
                await addTransaction(formData)
                formRef.current?.reset()
            }}
            className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-3xl shadow-sm transition-colors"
        >
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <input
                    name="description"
                    placeholder="Ex: Aluguel, Salário..."
                    className={`md:col-span-2 ${inputClasses}`}
                    required
                />
                <input
                    name="amount"
                    type="number"
                    step="0.01"
                    placeholder="Valor (R$)"
                    className={inputClasses}
                    required
                />
                <select
                    name="type"
                    className={`${inputClasses} font-bold`}
                >
                    <option value="income">Entrada (+)</option>
                    <option value="expense">Saída (-)</option>
                </select>
            </div>
            <button className="w-full mt-4 bg-emerald-600 text-white font-black py-4 rounded-xl hover:bg-emerald-700 active:scale-[0.98] transition-all uppercase tracking-widest text-[10px]">
                Registrar Transação
            </button>
        </form>
    )
}