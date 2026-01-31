import { createClient } from '@supabase/supabase-js'
import { addItem, toggleItem } from './actions'
import { Gift, Plus, CheckCircle2, Circle, Sparkles, Trophy } from 'lucide-react'

export default async function WishlistPage() {
    const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )

    const { data: items } = await supabase
        .from('wishlist')
        .select('*')
        .order('created_at', { ascending: false })

    const completedCount = items?.filter(i => i.is_completed).length || 0;

    return (
        <main className="max-w-2xl mx-auto p-4 md:p-12 min-h-screen transition-all">

            {/* Cabeçalho Minimalista */}
            <header className="text-center mb-12 space-y-4">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-[2rem] shadow-xl shadow-blue-500/20 text-white mb-2 rotate-3 hover:rotate-0 transition-transform duration-500">
                    <Gift size={32} />
                </div>
                <div>
                    <h1 className="text-5xl font-black text-slate-900 dark:text-white tracking-tighter italic uppercase leading-none">
                        Lab<span className="text-blue-600">.</span>Wish
                    </h1>
                    <div className="flex items-center justify-center gap-2 mt-3">
                        <Sparkles size={14} className="text-amber-500" />
                        <p className="text-slate-500 dark:text-slate-400 text-[10px] font-black uppercase tracking-[0.3em]">
                            Curadoria de Objetivos e Conquistas
                        </p>
                    </div>
                </div>

                {/* Progress Tracker Sutil */}
                {items && items.length > 0 && (
                    <div className="pt-6 max-w-[200px] mx-auto">
                        <div className="flex justify-between text-[10px] font-black uppercase mb-2 text-slate-400">
                            <span>Progresso</span>
                            <span>{Math.round((completedCount / items.length) * 100)}%</span>
                        </div>
                        <div className="h-1.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-blue-600 transition-all duration-1000"
                                style={{ width: `${(completedCount / items.length) * 100}%` }}
                            />
                        </div>
                    </div>
                )}
            </header>

            {/* Input de Adição de Alta Fidelidade */}
            <form action={addItem} className="relative mb-12 group">
                <input
                    name="title"
                    autoComplete="off"
                    placeholder="Adicione um novo desejo à lista..."
                    className="w-full bg-white dark:bg-slate-900 border-2 border-slate-100 dark:border-slate-800 p-6 pr-20 rounded-[2.5rem] outline-none focus:border-blue-500 dark:focus:border-blue-500 dark:text-white transition-all shadow-2xl shadow-slate-200/50 dark:shadow-none placeholder:text-slate-400 font-medium"
                    required
                />
                <button className="absolute right-3 top-1/2 -translate-y-1/2 bg-slate-900 dark:bg-blue-600 text-white w-12 h-12 rounded-2xl font-black hover:scale-110 transition-all active:scale-95 shadow-lg flex items-center justify-center group-focus-within:bg-blue-600">
                    <Plus size={24} strokeWidth={3} />
                </button>
            </form>

            {/* Listagem de Itens Estilizada */}
            <div className="space-y-4">
                {items?.length === 0 && (
                    <div className="text-center py-20 bg-slate-50/50 dark:bg-slate-900/30 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-[3rem]">
                        <Trophy size={40} className="mx-auto text-slate-200 dark:text-slate-700 mb-4" />
                        <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.3em]">Sua jornada começa aqui</p>
                    </div>
                )}

                {items?.map((item) => (
                    <div
                        key={item.id}
                        className={`group flex items-center justify-between p-2 pl-6 rounded-[2rem] border transition-all duration-500 ${item.is_completed
                                ? 'bg-slate-50/50 dark:bg-slate-900/20 border-transparent opacity-50 scale-[0.98]'
                                : 'bg-white dark:bg-slate-900 border-slate-100 dark:border-slate-800 shadow-[0_10px_30px_-15px_rgba(0,0,0,0.05)] dark:shadow-none hover:border-blue-500/30'
                            }`}
                    >
                        <div className="flex items-center gap-4 py-4">
                            <div className={item.is_completed ? 'text-emerald-500' : 'text-slate-300 dark:text-slate-700'}>
                                {item.is_completed ? <CheckCircle2 size={22} /> : <Circle size={22} />}
                            </div>
                            <span className={`text-sm font-bold tracking-tight transition-all duration-500 ${item.is_completed
                                    ? 'line-through text-slate-400 dark:text-slate-600 italic'
                                    : 'text-slate-800 dark:text-slate-100'
                                }`}>
                                {item.title}
                            </span>
                        </div>

                        <form action={async () => {
                            'use server'
                            await toggleItem(item.id, item.is_completed)
                        }}>
                            <button className={`
                                px-6 py-4 rounded-[1.5rem] text-[9px] font-black uppercase tracking-widest transition-all
                                ${item.is_completed
                                    ? 'text-slate-400 hover:text-blue-600'
                                    : 'bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 hover:bg-blue-600 hover:text-white shadow-sm'
                                }
                            `}>
                                {item.is_completed ? 'Desfazer' : 'Concluir'}
                            </button>
                        </form>
                    </div>
                ))}
            </div>

            <footer className="mt-16 text-center">
                <p className="text-[9px] font-black text-slate-300 dark:text-slate-700 uppercase tracking-[0.6em]">
                    Wishlist System Protocol v1.4
                </p>
            </footer>
        </main>
    )
}