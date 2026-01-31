// app/financas/page.tsx
import { auth } from "@/app/auth"
import { redirect } from "next/navigation"
import { createClient } from '@supabase/supabase-js'
import TransactionForm from "@/components/financas/TransactionForm"
import FinanceChart from "@/components/financas/FinanceChart"

export default async function FinancasPage() {
    const session = await auth()

    if (!session) redirect("/login")

    const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )

    const { data: transactions } = await supabase
        .from('transactions')
        .select('*')
        .eq('user_email', session.user?.email)
        .order('created_at', { ascending: false })

    const totalIncome = transactions?.filter(t => t.type === 'income').reduce((acc, t) => acc + Number(t.amount), 0) || 0
    const totalExpense = transactions?.filter(t => t.type === 'expense').reduce((acc, t) => acc + Number(t.amount), 0) || 0
    const chartData = [{ name: 'Entradas', value: totalIncome }, { name: 'Saídas', value: totalExpense }]

    return (
        <main className="p-6 md:p-12 max-w-5xl mx-auto bg-transparent">
            <header className="mb-10 flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-black text-slate-900 dark:text-white uppercase tracking-tighter">Meu Dashboard</h1>
                    <p className="text-slate-500 dark:text-slate-400 text-sm">Logado como: <span className="font-bold">{session.user?.email}</span></p>
                </div>
            </header>

            {/* Cards de Resumo */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-3xl shadow-sm transition-colors">
                    <p className="text-slate-400 dark:text-slate-500 text-[10px] font-black uppercase tracking-widest mb-1">Saldo Geral</p>
                    <h2 className={`text-4xl font-black ${(totalIncome - totalExpense) >= 0 ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-500'}`}>
                        R$ {(totalIncome - totalExpense).toFixed(2)}
                    </h2>
                </div>
                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-3xl shadow-sm transition-colors">
                    <p className="text-emerald-500 text-[10px] font-black uppercase tracking-widest mb-1">Entradas</p>
                    <h2 className="text-2xl font-black text-slate-800 dark:text-slate-100 font-mono">R$ {totalIncome.toFixed(2)}</h2>
                </div>
                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-3xl shadow-sm transition-colors">
                    <p className="text-red-500 text-[10px] font-black uppercase tracking-widest mb-1">Saídas</p>
                    <h2 className="text-2xl font-black text-slate-800 dark:text-slate-100 font-mono">R$ {totalExpense.toFixed(2)}</h2>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-6">
                    <TransactionForm />

                    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl overflow-hidden shadow-sm transition-colors">
                        {transactions?.length === 0 ? (
                            <p className="p-10 text-center text-slate-400 text-sm italic">Nenhuma transação encontrada.</p>
                        ) : (
                            transactions?.map(t => (
                                <div key={t.id} className="p-4 border-b border-slate-50 dark:border-slate-800 flex justify-between items-center hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                                    <div>
                                        <p className="font-bold text-slate-800 dark:text-slate-200 text-sm">{t.description}</p>
                                        <p className="text-[10px] text-slate-400 dark:text-slate-500 uppercase font-black">{new Date(t.created_at).toLocaleDateString('pt-BR')}</p>
                                    </div>
                                    <span className={`font-black text-sm ${t.type === 'income' ? 'text-emerald-500' : 'text-red-400'}`}>
                                        {t.type === 'income' ? '+' : '-'} R$ {Number(t.amount).toFixed(2)}
                                    </span>
                                </div>
                            ))
                        )}
                    </div>
                </div>

                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-3xl shadow-sm transition-colors h-fit">
                    <h3 className="font-black text-slate-800 dark:text-slate-100 mb-6 text-xs uppercase tracking-[0.2em]">Gráfico de Fluxo</h3>
                    <FinanceChart data={chartData} />
                </div>
            </div>
        </main>
    )
}