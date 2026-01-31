'use client'

import { registerUser } from './actions'
import Link from 'next/link'
import { useState } from 'react'

export default function RegistroPage() {
    const [loading, setLoading] = useState(false)

    return (
        <main className="flex items-center justify-center min-h-screen p-6 bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
            <div className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] shadow-xl dark:shadow-2xl border border-slate-200 dark:border-slate-800 w-full max-w-sm transition-all">
                <header className="text-center mb-8">
                    <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight uppercase italic">Criar Conta</h1>
                    <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">Junte-se ao laboratório de projetos</p>
                </header>

                <form action={async (formData) => {
                    setLoading(true)
                    const res = await registerUser(formData)
                    if (res?.error) alert(res.error)
                    setLoading(false)
                }} className="flex flex-col gap-4">

                    <input
                        name="name"
                        type="text"
                        placeholder="Nome Completo"
                        className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 outline-none focus:border-emerald-500 dark:focus:border-emerald-400 focus:bg-white dark:focus:bg-slate-900 transition-all text-sm text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-600"
                        required
                    />
                    <input
                        name="email"
                        type="email"
                        placeholder="E-mail"
                        className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 outline-none focus:border-emerald-500 dark:focus:border-emerald-400 focus:bg-white dark:focus:bg-slate-900 transition-all text-sm text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-600"
                        required
                    />
                    <input
                        name="password"
                        type="password"
                        placeholder="Crie uma senha forte"
                        className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 outline-none focus:border-emerald-500 dark:focus:border-emerald-400 focus:bg-white dark:focus:bg-slate-900 transition-all text-sm text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-600"
                        required
                    />

                    <button
                        disabled={loading}
                        className={`w-full font-black py-4 mt-2 rounded-2xl transition-all shadow-lg uppercase tracking-widest text-xs ${loading
                                ? 'bg-slate-300 dark:bg-slate-800 text-slate-500 cursor-not-allowed'
                                : 'bg-emerald-600 text-white hover:bg-emerald-700 dark:bg-emerald-500 dark:hover:bg-emerald-600 shadow-emerald-500/20'
                            }`}
                    >
                        {loading ? 'Processando...' : 'Finalizar Cadastro'}
                    </button>
                </form>

                <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800 text-center">
                    <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">
                        Já possui conta?
                        <Link href="/login" className="ml-2 text-emerald-600 dark:text-emerald-400 font-black hover:underline transition-all">
                            Entre agora
                        </Link>
                    </p>
                </div>
            </div>
        </main>
    )
}