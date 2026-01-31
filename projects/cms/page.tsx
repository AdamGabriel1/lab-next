import { createClient } from '@supabase/supabase-js'
import { auth } from '@/app/auth'
import Link from 'next/link'

export default async function CMSPage() {
    const session = await auth()
    const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!)

    const { data: posts } = await supabase.from('posts').select('*').order('created_at', { ascending: false })

    return (
        <main className="max-w-5xl mx-auto p-6 md:p-12 transition-colors">
            <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-12 gap-6">
                <div>
                    <h1 className="text-4xl font-black text-slate-900 dark:text-white tracking-tighter">Blog Lab</h1>
                    <p className="text-slate-500 dark:text-slate-400 font-medium">Gerencie seu conteúdo dinâmico.</p>
                </div>
                <Link
                    href="/cms/novo"
                    className="bg-slate-900 dark:bg-blue-600 text-white px-8 py-3 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-blue-600 dark:hover:bg-blue-700 transition-all shadow-lg active:scale-95"
                >
                    Escrever Artigo
                </Link>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {posts?.map(post => (
                    <Link
                        key={post.id}
                        href={`/cms/post/${post.id}`}
                        className="group bg-white dark:bg-slate-900 p-8 rounded-[2rem] border border-slate-200 dark:border-slate-800 hover:shadow-2xl hover:border-blue-500 dark:hover:border-blue-500 transition-all duration-300"
                    >
                        <span className="text-[10px] font-black uppercase text-blue-600 dark:text-blue-400 tracking-widest bg-blue-50 dark:bg-blue-500/10 px-3 py-1 rounded-full">
                            {new Date(post.created_at).toLocaleDateString('pt-BR')}
                        </span>
                        <h2 className="text-2xl font-bold mt-6 text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors leading-tight">
                            {post.title}
                        </h2>
                        <p className="text-slate-400 dark:text-slate-500 text-sm mt-3 line-clamp-2 leading-relaxed">
                            {/* Um pequeno resumo simulado */}
                            Clique para explorar este conteúdo e ver a renderização completa...
                        </p>
                    </Link>
                ))}
            </div>
        </main>
    )
}