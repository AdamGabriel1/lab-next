import { auth } from "@/app/auth"
import { redirect } from "next/navigation"
import { createClient } from '@supabase/supabase-js'
import DeleteButton from '@/components/encurtador/DeleteButton'
import Link from 'next/link'

export default async function AdminLinksPage() {
    const session = await auth()
    if (!session?.user?.email) redirect("@app/login")

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
        <main className="p-6 md:p-12 max-w-5xl mx-auto transition-colors">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-10 gap-4">
                <div>
                    <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tighter">Meus Links</h1>
                    <p className="text-slate-500 dark:text-slate-400 font-medium">Gerencie e acompanhe o desempenho.</p>
                </div>
                <Link
                    href="/lab/encurtador"
                    className="bg-blue-600 text-white px-6 py-3 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-blue-700 transition-all shadow-lg active:scale-95"
                >
                    + Novo Link
                </Link>
            </div>

            <div className="grid grid-cols-1 gap-4">
                {links?.length === 0 ? (
                    <div className="text-center py-20 bg-slate-50 dark:bg-slate-900/50 rounded-[2.5rem] border-2 border-dashed border-slate-200 dark:border-slate-800">
                        <p className="text-slate-400 dark:text-slate-600 font-bold tracking-widest uppercase text-xs">Vazio por aqui...</p>
                    </div>
                ) : (
                    links?.map((link) => (
                        <div key={link.id} className="bg-white dark:bg-slate-900 p-6 rounded-[2rem] border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6 hover:border-blue-300 dark:hover:border-blue-600 transition-all group">
                            <div className="flex-1">
                                <h3 className="font-black text-blue-600 dark:text-blue-400 text-xl tracking-tight">/{link.short_code}</h3>
                                <p className="text-slate-400 dark:text-slate-500 text-xs truncate max-w-[300px] font-medium mt-1">{link.original_url}</p>
                            </div>

                            <div className="flex items-center justify-between md:justify-end gap-10">
                                <div className="text-center">
                                    <p className="text-[10px] font-black uppercase text-slate-400 dark:text-slate-600 tracking-widest">Cliques</p>
                                    <p className="text-2xl font-black text-slate-800 dark:text-slate-100">{link.clicks}</p>
                                </div>

                                <div className="text-center border-l border-slate-100 dark:border-slate-800 pl-10">
                                    <p className="text-[10px] font-black uppercase text-slate-400 dark:text-slate-600 tracking-widest">Criado em</p>
                                    <p className="text-sm font-bold text-slate-600 dark:text-slate-400">
                                        {new Date(link.created_at).toLocaleDateString('pt-BR')}
                                    </p>
                                </div>
                                <div className="md:ml-4">
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