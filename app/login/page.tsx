'use client'

import { signIn } from "next-auth/react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"

export default function LoginPage() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)
    const router = useRouter()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)

        const result = await signIn("credentials", {
            email,
            password,
            redirect: false,
        })

        if (result?.error) {
            alert("Email ou senha incorretos!")
            setLoading(false)
        } else {
            router.push("/") // Mudei para o Hub, ajuste se preferir /financas
            router.refresh()
        }
    }

    return (
        <main className="flex items-center justify-center min-h-screen p-6 bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
            <div className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] shadow-xl dark:shadow-2xl border border-slate-200 dark:border-slate-800 w-full max-w-sm transition-all">
                <header className="text-center mb-8">
                    <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight uppercase italic">Lab.Login</h1>
                    <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">Acesse sua conta para continuar</p>
                </header>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <div className="space-y-1">
                        <label className="text-[10px] font-black text-slate-400 dark:text-slate-500 ml-1 uppercase tracking-widest">Email</label>
                        <input
                            type="email"
                            placeholder="seu@email.com"
                            className="w-full p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 outline-none focus:border-blue-500 dark:focus:border-blue-400 focus:bg-white dark:focus:bg-slate-900 transition-all text-sm text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-600"
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div className="space-y-1">
                        <label className="text-[10px] font-black text-slate-400 dark:text-slate-500 ml-1 uppercase tracking-widest">Senha</label>
                        <input
                            type="password"
                            placeholder="••••••••"
                            className="w-full p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 outline-none focus:border-blue-500 dark:focus:border-blue-400 focus:bg-white dark:focus:bg-slate-900 transition-all text-sm text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-600"
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <button
                        disabled={loading}
                        className={`w-full font-black py-4 mt-2 rounded-2xl transition-all shadow-lg uppercase tracking-widest text-xs ${loading
                            ? 'bg-slate-300 dark:bg-slate-800 text-slate-500 cursor-not-allowed'
                            : 'bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 shadow-blue-500/20'
                            }`}
                    >
                        {loading ? 'Validando...' : 'Entrar no Lab'}
                    </button>
                </form>

                <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800 text-center">
                    <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">
                        Ainda não tem conta?
                        <Link href="/registro" className="ml-2 text-blue-600 dark:text-blue-400 font-black hover:underline transition-all">
                            Cadastre-se
                        </Link>
                    </p>
                </div>
            </div>
        </main>
    )
}