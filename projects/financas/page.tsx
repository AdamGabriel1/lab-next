import { auth } from "@/app/auth"
import { redirect } from "next/navigation"
import { createClient } from '@supabase/supabase-js'
import TransactionForm from "@/components/financas/TransactionForm"
import FinanceChart from "@/components/financas/FinanceChart"
import { Wallet, ArrowUpCircle, ArrowDownCircle, TrendingUp } from "lucide-react"
import DeleteButton from "@/components/financas/DeleteButton"

// Definimos a interface para o TS não reclamar do "any"
interface Transaction {
    id: string;
    description: string;
    amount: number;
    type: 'income' | 'expense';
    created_at: string;
    user_email: string;
}

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

    // Tipamos os dados vindos do banco
    const transactions = (data as Transaction[]) || []

    const totalIncome = transactions
        .filter((t: Transaction) => t.type === 'income')
        .reduce((acc: number, t: Transaction) => acc + Number(t.amount), 0)

    const totalExpense = transactions
        .filter((t: Transaction) => t.type === 'expense')
        .reduce((acc: number, t: Transaction) => acc + Number(t.amount), 0)

    const balance = totalIncome - totalExpense

    const chartData = [
        { name: 'Entradas', value: totalIncome },
        { name: 'Saídas', value: totalExpense }
    ].filter(d => d.value > 0)

    return (
        <main className="p-4 md:p-10 max-w-6xl mx-auto min-h-screen bg-transparent">
            {/* Header com estilo Lab */}
            <header className="mb-12 flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
                <div>
                    <div className="flex items-center gap-2 mb-1">
                        <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
                        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">Finance Control</span>
                    </div>
                    <h1 className="text-4xl font-black text-slate-900 dark:text-white uppercase italic tracking-tighter">
                        Dashboard<span className="text-blue-500">.</span>
                    </h1>
                </div>
                <div className="bg-slate-100 dark:bg-slate-800/50 px-4 py-2 rounded-2xl border border-slate-200 dark:border-slate-800">
                    <p className="text-slate-500 dark:text-slate-400 text-xs font-medium">
                        Identidade: <span className="font-bold text-slate-900 dark:text-white">{session.user?.email}</span>
                    </p>
                </div>
            </header>

            {/* Cards de Resumo Estilizados */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                <div className="relative overflow-hidden bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-8 rounded-[2.5rem] shadow-sm transition-all hover:shadow-md">
                    <Wallet className="absolute -right-4 -top-4 w-24 h-24 text-slate-50 dark:text-slate-800/50 -z-0" />
                    <div className="relative z-10">
                        <p className="text-slate-400 dark:text-slate-500 text-[10px] font-black uppercase tracking-widest mb-2">Saldo Disponível</p>
                        <h2 className={`text-4xl font-black tracking-tighter ${balance >= 0 ? 'text-slate-900 dark:text-white' : 'text-red-500'}`}>
                            R$ {balance.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                        </h2>
                    </div>
                </div>

                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-8 rounded-[2.5rem] shadow-sm flex items-center gap-6">
                    <div className="p-3 bg-emerald-50 dark:bg-emerald-500/10 rounded-2xl text-emerald-600 dark:text-emerald-400">
                        <ArrowUpCircle size={32} />
                    </div>
                    <div>
                        <p className="text-emerald-500/70 text-[10px] font-black uppercase tracking-widest mb-1">Entradas</p>
                        <h2 className="text-2xl font-black text-slate-800 dark:text-slate-100 italic">R$ {totalIncome.toFixed(2)}</h2>
                    </div>
                </div>

                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-8 rounded-[2.5rem] shadow-sm flex items-center gap-6">
                    <div className="p-3 bg-red-50 dark:bg-red-500/10 rounded-2xl text-red-600 dark:text-red-400">
                        <ArrowDownCircle size={32} />
                    </div>
                    <div>
                        <p className="text-red-500/70 text-[10px] font-black uppercase tracking-widest mb-1">Saídas</p>
                        <h2 className="text-2xl font-black text-slate-800 dark:text-slate-100 italic">R$ {totalExpense.toFixed(2)}</h2>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                <div className="lg:col-span-8 space-y-8">
                    <section className="bg-slate-50 dark:bg-slate-900/50 p-1 rounded-[2.5rem] border border-dashed border-slate-200 dark:border-slate-800">
                        <TransactionForm />
                    </section>

                    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[2.5rem] overflow-hidden shadow-sm">
                        <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center">
                            <h3 className="font-black text-xs uppercase tracking-widest text-slate-400 italic">Histórico Recente</h3>
                            <TrendingUp size={16} className="text-slate-300" />
                        </div>
                        <div className="divide-y divide-slate-50 dark:divide-slate-800">
                            {transactions.length === 0 ? (
                                <div className="p-20 text-center">
                                    <p className="text-slate-400 text-sm font-medium italic text-balance">Nenhum registro no radar...</p>
                                </div>
                            ) : (
                                transactions.map((t: Transaction) => (
                                    <div key={t.id} className="p-6 flex justify-between items-center hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-all group">
                                        <div className="flex gap-4 items-center">
                                            <div className={`w-2 h-2 rounded-full ${t.type === 'income' ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.4)]' : 'bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.4)]'}`} />
                                            <div>
                                                <p className="font-bold text-slate-800 dark:text-slate-200 text-sm group-hover:translate-x-1 transition-transform">{t.description}</p>
                                                <p className="text-[10px] text-slate-400 dark:text-slate-500 uppercase font-black tracking-tighter">
                                                    {new Date(t.created_at).toLocaleDateString('pt-BR')}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-4">
                                            <span className={`font-black text-sm ${t.type === 'income' ? 'text-emerald-500' : 'text-red-400'}`}>
                                                {t.type === 'income' ? '+' : '-'} R$ {Number(t.amount).toFixed(2)}
                                            </span>
                                            <DeleteButton id={t.id} />
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </div>

                <div className="lg:col-span-4">
                    <div className="sticky top-24">
                        <FinanceChart data={chartData} />
                    </div>
                </div>
            </div>
        </main>
    )
}