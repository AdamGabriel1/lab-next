import { auth } from "@/app/auth"
import { redirect } from "next/navigation"
import { createClient } from '@supabase/supabase-js'
import TransactionForm from "@/components/financas/TransactionForm"
import FinanceChart from "@/components/financas/FinanceChart"
import { Wallet, ArrowUpCircle, ArrowDownCircle, TrendingUp, Calendar, CreditCard } from "lucide-react"
import DeleteButton from "@/components/financas/DeleteButton"

export const dynamic = 'force-dynamic';

export default async function FinancasPage() {
    const session = await auth()
    if (!session) redirect("/login")

    const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )

    const { data } = await supabase
        .from('transactions')
        .select('*')
        .eq('user_email', session.user?.email)
        .order('created_at', { ascending: false })

    const transactions = data || []

    const totalIncome = transactions
        .filter((t: any) => t.type === 'income')
        .reduce((acc: number, t: any) => acc + Number(t.amount), 0)

    const totalExpense = transactions
        .filter((t: any) => t.type === 'expense')
        .reduce((acc: number, t: any) => acc + Number(t.amount), 0)

    const balance = totalIncome - totalExpense

    return (
        <main className="p-4 md:p-10 max-w-7xl mx-auto min-h-screen bg-slate-50/50 dark:bg-[#0b0f1a] text-slate-900 dark:text-slate-100 transition-colors duration-500">

            {/* Header Refinado */}
            <header className="mb-10 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
                <div className="space-y-1">
                    <div className="flex items-center gap-2 mb-2">
                        <span className="relative flex h-3 w-3">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-500"></span>
                        </span>
                        <span className="text-[11px] font-bold uppercase tracking-[0.4em] text-blue-600 dark:text-blue-400">Live Analytics</span>
                    </div>
                    <h1 className="text-5xl font-black tracking-tight text-slate-900 dark:text-white italic uppercase">
                        Finanças<span className="text-blue-600 font-serif">.</span>
                    </h1>
                </div>

                <div className="flex items-center gap-3 bg-white dark:bg-slate-900 shadow-sm border border-slate-200 dark:border-slate-800 p-3 rounded-2xl">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white font-bold">
                        {session.user?.email?.charAt(0).toUpperCase()}
                    </div>
                    <div className="hidden sm:block">
                        <p className="text-[10px] uppercase font-black text-slate-400 leading-none">Conta Ativa</p>
                        <p className="text-sm font-bold truncate max-w-[150px]">{session.user?.email}</p>
                    </div>
                </div>
            </header>

            {/* Cards de Resumo com Efeito Premium */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                {/* Saldo - Destaque */}
                <div className="group relative overflow-hidden bg-gradient-to-br from-slate-900 to-slate-800 dark:from-blue-700 dark:to-indigo-900 p-8 rounded-[2.5rem] shadow-2xl transition-all hover:-translate-y-1">
                    <Wallet className="absolute -right-6 -top-6 w-32 h-32 text-white/10 rotate-12 transition-transform group-hover:rotate-0" />
                    <div className="relative z-10">
                        <p className="text-blue-200/60 text-xs font-bold uppercase tracking-widest mb-3">Saldo em conta</p>
                        <h2 className="text-4xl font-black tracking-tighter text-white">
                            R$ {balance.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                        </h2>
                        <div className="mt-4 inline-flex items-center gap-2 bg-white/10 px-3 py-1 rounded-full backdrop-blur-md">
                            <TrendingUp size={14} className="text-blue-300" />
                            <span className="text-[10px] font-bold text-white uppercase italic">Atualizado agora</span>
                        </div>
                    </div>
                </div>

                {/* Entradas */}
                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-8 rounded-[2.5rem] shadow-sm hover:shadow-xl transition-all">
                    <div className="flex justify-between items-start mb-4">
                        <div className="p-4 bg-emerald-500/10 rounded-2xl text-emerald-600 dark:text-emerald-400">
                            <ArrowUpCircle size={28} />
                        </div>
                        <span className="text-[10px] font-black text-emerald-500 bg-emerald-500/10 px-2 py-1 rounded-lg italic">RECEITA</span>
                    </div>
                    <p className="text-slate-400 dark:text-slate-500 text-xs font-bold uppercase tracking-widest mb-1">Entradas Mensais</p>
                    <h2 className="text-3xl font-black italic">R$ {totalIncome.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</h2>
                </div>

                {/* Saídas */}
                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-8 rounded-[2.5rem] shadow-sm hover:shadow-xl transition-all">
                    <div className="flex justify-between items-start mb-4">
                        <div className="p-4 bg-red-500/10 rounded-2xl text-red-600 dark:text-red-400">
                            <ArrowDownCircle size={28} />
                        </div>
                        <span className="text-[10px] font-black text-red-500 bg-red-500/10 px-2 py-1 rounded-lg italic">DESPESA</span>
                    </div>
                    <p className="text-slate-400 dark:text-slate-500 text-xs font-bold uppercase tracking-widest mb-1">Gastos Totais</p>
                    <h2 className="text-3xl font-black italic">R$ {totalExpense.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</h2>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                {/* Lado Esquerdo: Formulário e Lista */}
                <div className="lg:col-span-8 space-y-10">
                    <section className="bg-white dark:bg-slate-900/50 p-6 rounded-[3rem] border border-slate-200 dark:border-slate-800 shadow-sm">
                        <div className="flex items-center gap-3 mb-6 px-4">
                            <CreditCard className="text-blue-500" size={20} />
                            <h2 className="text-sm font-black uppercase tracking-widest italic">Nova Transação</h2>
                        </div>
                        <TransactionForm />
                    </section>

                    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[3rem] overflow-hidden shadow-2xl">
                        <div className="p-8 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <Calendar size={20} className="text-slate-400" />
                                <h3 className="font-black text-sm uppercase tracking-widest text-slate-500 italic">Movimentações</h3>
                            </div>
                            <span className="text-[10px] font-bold bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-full">
                                {transactions.length} registros
                            </span>
                        </div>

                        <div className="divide-y divide-slate-50 dark:divide-slate-800">
                            {transactions.length === 0 ? (
                                <div className="p-24 text-center">
                                    <div className="w-16 h-16 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <TrendingUp className="text-slate-300" />
                                    </div>
                                    <p className="text-slate-400 text-xs font-black uppercase tracking-tighter italic">Nenhum fluxo detectado</p>
                                </div>
                            ) : (
                                transactions.map((t: any) => (
                                    <div key={t.id} className="p-6 flex justify-between items-center hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-all group border-l-4 border-transparent hover:border-blue-500">
                                        <div className="flex gap-5 items-center">
                                            <div className={`p-3 rounded-2xl ${t.type === 'income' ? 'bg-emerald-500/10 text-emerald-600' : 'bg-red-500/10 text-red-600'}`}>
                                                {t.type === 'income' ? <ArrowUpCircle size={20} /> : <ArrowDownCircle size={20} />}
                                            </div>
                                            <div>
                                                <p className="font-black text-slate-800 dark:text-slate-100 text-base mb-0.5">{t.description}</p>
                                                <p className="text-[10px] text-slate-400 dark:text-slate-500 uppercase font-black tracking-widest">
                                                    {new Date(t.created_at).toLocaleDateString('pt-BR', { day: '2-digit', month: 'long' })}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-6">
                                            <span className={`font-mono font-black text-lg ${t.type === 'income' ? 'text-emerald-500' : 'text-red-400'}`}>
                                                {t.type === 'income' ? '+' : '-'} R$ {Number(t.amount).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                                            </span>
                                            <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                                                <DeleteButton id={t.id} />
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </div>

                {/* Lado Direito: Gráfico */}
                <div className="lg:col-span-4 space-y-8">
                    <div className="sticky top-10">
                        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[3rem] p-8 shadow-sm">
                            <h3 className="font-black text-xs uppercase tracking-widest text-slate-400 mb-8 italic flex items-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
                                Divisão de Gastos
                            </h3>
                            <FinanceChart data={[
                                { name: 'Entradas', value: totalIncome },
                                { name: 'Saídas', value: totalExpense }
                            ].filter(d => d.value > 0)} />
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}