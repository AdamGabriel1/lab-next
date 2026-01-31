// app/wishlist/page.tsx
import { createClient } from '@supabase/supabase-js'
import { addItem, toggleItem } from './actions'

export default async function WishlistPage() {
    const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )

    const { data: items } = await supabase
        .from('wishlist')
        .select('*')
        .order('created_at', { ascending: false })

    return (
        <main className="max-w-xl mx-auto p-6 md:p-12 transition-colors">
            <header className="text-center mb-10">
                <h1 className="text-4xl font-black text-slate-900 dark:text-white tracking-tighter italic uppercase">
                    Lab.Wish <span className="not-italic">🎁</span>
                </h1>
                <p className="text-slate-500 dark:text-slate-400 text-sm font-medium mt-2">
                    Objetivos e desejos em progresso.
                </p>
            </header>

            {/* Formulário para adicionar item */}
            <form action={addItem} className="flex gap-2 mb-10 group">
                <input
                    name="title"
                    placeholder="O que você deseja conquistar?"
                    className="flex-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 rounded-2xl outline-none focus:border-blue-500 dark:focus:border-blue-500 dark:text-white transition-all shadow-sm placeholder:text-slate-400"
                    required
                />
                <button className="bg-slate-900 dark:bg-blue-600 text-white px-6 rounded-2xl font-black hover:bg-blue-600 dark:hover:bg-blue-700 transition-all active:scale-95 shadow-lg flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                    </svg>
                </button>
            </form>

            {/* Lista de itens */}
            <ul className="space-y-3">
                {items?.length === 0 && (
                    <div className="text-center py-12 border-2 border-dashed border-slate-100 dark:border-slate-800 rounded-3xl">
                        <p className="text-slate-400 text-xs font-black uppercase tracking-widest">Sua lista está vazia</p>
                    </div>
                )}

                {items?.map((item) => (
                    <li
                        key={item.id}
                        className={`flex items-center justify-between p-5 rounded-2xl border transition-all duration-300 ${item.is_completed
                                ? 'bg-slate-50 dark:bg-slate-900/50 border-slate-100 dark:border-slate-800 opacity-60'
                                : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 shadow-sm'
                            }`}
                    >
                        <span className={`text-sm font-bold tracking-tight transition-all ${item.is_completed
                                ? 'line-through text-slate-400 dark:text-slate-600'
                                : 'text-slate-800 dark:text-slate-200'
                            }`}>
                            {item.title}
                        </span>

                        <form action={async () => {
                            'use server'
                            await toggleItem(item.id, item.is_completed)
                        }}>
                            <button className={`
                                text-[10px] font-black uppercase tracking-widest px-4 py-2 rounded-xl transition-all
                                ${item.is_completed
                                    ? 'bg-slate-200 dark:bg-slate-800 text-slate-500 dark:text-slate-400 hover:bg-slate-300'
                                    : 'bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 hover:bg-blue-100'
                                }
                            `}>
                                {item.is_completed ? 'Desfazer' : 'Concluir'}
                            </button>
                        </form>
                    </li>
                ))}
            </ul>
        </main>
    )
}