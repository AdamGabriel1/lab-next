import { createClient } from '@supabase/supabase-js'
import { auth } from '@/app/auth'
import Link from 'next/link'
import { PenTool, ArrowRight, Bookmark, LayoutGrid } from 'lucide-react'

export default async function CMSPage() {
    const session = await auth()
    const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!)

    const { data: posts } = await supabase.from('posts').select('*').order('created_at', { ascending: false })

    return (
        <main className="max-w-6xl mx-auto p-4 md:p-12 min-h-screen transition-colors">
            <header className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-8">
                <div className="space-y-2">
                    <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400">
                        <LayoutGrid size={18} />
                        <span className="text-[10px] font-black uppercase tracking-[0.4em]">Content Management</span>
                    </div>
                    <h1 className="text-6xl font-black text-slate-900 dark:text-white tracking-tighter italic uppercase">
                        Blog<span className="text-blue-600">.</span>Lab
                    </h1>
                    <p className="text-slate-500 dark:text-slate-400 font-medium italic">Sua plataforma de ideias e documentação técnica.</p>
                </div>

                <Link
                    href="/lab/cms/novo"
                    className="group bg-slate-900 dark:bg-blue-600 text-white px-10 py-5 rounded-[2rem] font-black text-xs uppercase tracking-[0.2em] hover:bg-blue-600 dark:hover:bg-blue-700 transition-all shadow-2xl shadow-blue-500/10 active:scale-95 flex items-center gap-3"
                >
                    <PenTool size={16} className="group-hover:rotate-12 transition-transform" />
                    Escrever Artigo
                </Link>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                {posts?.map((post, index) => (
                    <Link
                        key={post.id}
                        href={`/lab/cms/post/${post.id}`}
                        className={`group relative bg-white dark:bg-slate-900 p-10 rounded-[3rem] border border-slate-200 dark:border-slate-800 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] dark:hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5)] ${index === 0 ? 'md:col-span-2 bg-gradient-to-br from-white to-slate-50 dark:from-slate-900 dark:to-slate-800/50' : ''}`}
                    >
                        <div className="flex justify-between items-start mb-8">
                            <span className="text-[10px] font-black uppercase text-blue-600 dark:text-blue-400 tracking-widest bg-blue-50 dark:bg-blue-500/10 px-4 py-1.5 rounded-full border border-blue-100 dark:border-blue-500/20">
                                {new Date(post.created_at).toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' })}
                            </span>
                            <Bookmark size={18} className="text-slate-200 dark:text-slate-700 group-hover:text-blue-500 transition-colors" />
                        </div>

                        <h2 className={`${index === 0 ? 'text-4xl' : 'text-2xl'} font-black text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors leading-[1.1] tracking-tighter mb-4`}>
                            {post.title}
                        </h2>

                        <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed line-clamp-2 italic mb-8">
                            Acesse a leitura completa para explorar os detalhes deste artigo e as implementações técnicas discutidas no Lab.
                        </p>

                        <div className="flex items-center gap-2 text-slate-900 dark:text-white font-black text-[10px] uppercase tracking-widest group-hover:gap-4 transition-all">
                            Ler Artigo <ArrowRight size={14} className="text-blue-600" />
                        </div>
                    </Link>
                ))}
            </div>
        </main>
    )
}