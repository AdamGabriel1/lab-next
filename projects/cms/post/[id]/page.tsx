import { createClient } from '@supabase/supabase-js'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ChevronLeft, Clock, Share2 } from 'lucide-react'

export default async function PostDetail({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params
    const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!)

    const { data: post } = await supabase.from('posts').select('*').eq('id', id).single()

    if (!post) notFound()

    return (
        <main className="min-h-screen bg-white dark:bg-[#0b0f1a] transition-colors duration-500">
            {/* Barra Superior de Leitura */}
            <nav className="sticky top-0 z-50 bg-white/80 dark:bg-[#0b0f1a]/80 backdrop-blur-md border-b border-slate-100 dark:border-slate-800">
                <div className="max-w-3xl mx-auto px-6 h-16 flex items-center justify-between">
                    <Link
                        href="/lab/cms"
                        className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-slate-400 hover:text-blue-600 transition-colors"
                    >
                        <ChevronLeft size={16} /> Voltar
                    </Link>
                    <div className="flex gap-4">
                        <Share2 size={16} className="text-slate-400 hover:text-blue-600 cursor-pointer" />
                    </div>
                </div>
            </nav>

            <article className="max-w-3xl mx-auto p-6 md:pt-20 md:pb-32">
                <header className="mb-16">
                    <div className="flex items-center gap-3 mb-6">
                        <span className="w-12 h-[2px] bg-blue-600"></span>
                        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-600">Publicação Oficial</span>
                    </div>

                    <h1 className="text-5xl md:text-7xl font-black text-slate-900 dark:text-white mb-10 leading-[0.95] tracking-[ -0.05em] uppercase italic">
                        {post.title}
                    </h1>

                    <div className="flex items-center justify-between py-8 border-y border-slate-100 dark:border-slate-800">
                        <div className="flex items-center gap-4">
                            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center font-black text-white text-xl shadow-lg shadow-blue-500/20">
                                {post.user_email[0].toUpperCase()}
                            </div>
                            <div>
                                <p className="text-sm font-black text-slate-900 dark:text-white tracking-tight leading-none mb-1">{post.user_email}</p>
                                <div className="flex items-center gap-2 text-[10px] font-bold uppercase text-slate-400 tracking-tighter">
                                    <Clock size={10} /> 6 min de leitura • {new Date(post.created_at).toLocaleDateString('pt-BR')}
                                </div>
                            </div>
                        </div>
                    </div>
                </header>

                <section
                    className="prose prose-slate dark:prose-invert lg:prose-xl 
                    prose-headings:font-black prose-headings:tracking-tighter prose-headings:uppercase prose-headings:italic
                    prose-p:leading-[1.8] prose-p:text-slate-600 dark:prose-p:text-slate-400 prose-p:font-medium
                    prose-strong:text-blue-600 dark:prose-strong:text-blue-400
                    prose-img:rounded-[2.5rem] prose-img:shadow-2xl
                    prose-code:bg-blue-50 dark:prose-code:bg-blue-500/10 prose-code:p-1 prose-code:rounded-lg prose-code:text-blue-600 dark:prose-code:text-blue-400 prose-code:before:content-none prose-code:after:content-none"
                    dangerouslySetInnerHTML={{ __html: post.content }}
                />
            </article>
        </main>
    )
}