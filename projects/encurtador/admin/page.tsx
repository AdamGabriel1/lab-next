import { auth } from "@/app/auth"
import { redirect } from "next/navigation"
import { createClient } from '@supabase/supabase-js'
import DeleteButton from '@/components/encurtador/DeleteButton'
import Link from 'next/link'
import { Plus, BarChart3, Globe, Clock, MousePointer2 } from 'lucide-react'

export default async function AdminLinksPage() {
    const session = await auth()
    if (!session?.user?.email) redirect("/login")

    const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )

    const { data: links } = await supabase
        .from('links')
        .select('*')
        .eq('user_email', session.user.email)
        .order('created_at', { ascending: false })

    return (
        <main className="p-4 md:p-12 max-w-6xl mx-auto min-h-screen text-slate-900 dark:text-slate-100 transition-all">
            {/* Header Admin */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-12 gap-6 bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-sm">
                <div>
                    <h1 className="text-4xl font-black text-slate-900 dark:text-white tracking-tighter uppercase italic">
                        Link <span className="text-blue-600">Central.</span>
                    </h1>
                    <p className="text-slate-500 dark:text-slate-400 font-medium italic text-sm mt-1">Gerencie sua presença digital condensada.</p>
                </div>
                <Link
                    href="/lab/encurtador"
                    className="group bg-blue-600 text-white px-8 py-4 rounded-2xl font-black text-[11px] uppercase tracking-widest hover:bg-blue-700 transition-all shadow-xl shadow-blue-500/20 active:scale-95 flex items-center gap-2"
                >
                    <Plus size={16} className="transition-transform group-hover:rotate-90" />
                    Novo ZIP
                </Link>
            </div>

            {/* Grid de Cards de Links */}
            <div className="grid grid-cols-1 gap-6">
                {links?.length === 0 ? (
                    <div className="text-center py-32 bg-slate-50/50 dark:bg-slate-900/20 rounded-[3rem] border-4 border-dashed border-slate-100 dark:border-slate-800">
                        <div className="bg-white dark:bg-slate-900 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
                            <BarChart3 className="text-slate-300 dark:text-slate-700" size={32} />
                        </div>
                        <p className="text-slate-400 dark:text-slate-500 font-black tracking-[0.3em] uppercase text-xs italic">Aguardando novos links</p>
                    </div>
                ) : (
                    links?.map((link) => (
                        <div key={link.id} className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col lg:flex-row lg:items-center justify-between gap-8 hover:shadow-2xl hover:border-blue-200 dark:hover:border-blue-900/50 transition-all group relative overflow-hidden">
                            <div className="absolute top-0 left-0 w-1.5 h-full bg-blue-600 opacity-0 group-hover:opacity-100 transition-opacity" />

                            <div className="flex-1 space-y-2">
                                <div className="flex items-center gap-2">
                                    <h3 className="font-black text-blue-600 dark:text-blue-400 text-2xl tracking-tighter uppercase italic">/{link.short_code}</h3>
                                    <div className="h-1 w-1 rounded-full bg-slate-300 dark:bg-slate-700" />
                                    <span className="text-[10px] font-black text-slate-400 dark:text-slate-600 uppercase tracking-widest">Ativo</span>
                                </div>
                                <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
                                    <Globe size={12} className="shrink-0" />
                                    <p className="text-xs font-bold truncate max-w-[250px] md:max-w-[400px] italic">{link.original_url}</p>
                                </div>
                            </div>

                            <div className="flex flex-wrap items-center gap-8 lg:gap-12">
                                {/* Métrica Cliques */}
                                <div className="flex items-center gap-4">
                                    <div className="p-3 bg-blue-50 dark:bg-blue-500/10 rounded-xl text-blue-600 dark:text-blue-400">
                                        <MousePointer2 size={18} />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest leading-none mb-1">Engajamento</p>
                                        <p className="text-2xl font-black text-slate-800 dark:text-slate-100">{link.clicks}<span className="text-[10px] ml-1 text-slate-400 uppercase italic">cliques</span></p>
                                    </div>
                                </div>

                                {/* Métrica Data */}
                                <div className="flex items-center gap-4 border-l border-slate-100 dark:border-slate-800 pl-8 hidden sm:flex">
                                    <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl text-slate-400">
                                        <Clock size={18} />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest leading-none mb-1">Data</p>
                                        <p className="text-sm font-black text-slate-600 dark:text-slate-400 uppercase tracking-tighter">
                                            {new Date(link.created_at).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' })}
                                        </p>
                                    </div>
                                </div>

                                <div className="ml-auto lg:ml-4 bg-red-50 dark:bg-red-500/5 p-2 rounded-xl border border-red-500/10 opacity-60 hover:opacity-100 transition-opacity">
                                    <DeleteButton id={link.id} />
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </main>
    )
}