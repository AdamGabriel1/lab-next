import { createClient } from '@supabase/supabase-js'
import { notFound } from 'next/navigation'

export default async function PostDetail({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params
    const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!)

    const { data: post } = await supabase.from('posts').select('*').eq('id', id).single()

    if (!post) notFound()

    return (
        <main className="max-w-3xl mx-auto p-6 md:py-20 transition-colors">
            <h1 className="text-5xl md:text-6xl font-black text-slate-900 dark:text-white mb-8 leading-[1.1] tracking-tighter">
                {post.title}
            </h1>

            <div className="flex items-center gap-4 mb-12 pb-8 border-b border-slate-100 dark:border-slate-800">
                <div className="w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center font-black text-slate-400 dark:text-slate-600 border border-slate-200 dark:border-slate-700 uppercase">
                    {post.user_email[0]}
                </div>
                <div>
                    <p className="text-sm font-bold text-slate-800 dark:text-slate-200 tracking-tight">{post.user_email}</p>
                    <p className="text-[10px] font-black uppercase text-slate-400 dark:text-slate-500 tracking-widest">Publicado em {new Date(post.created_at).toLocaleDateString('pt-BR')}</p>
                </div>
            </div>

            {/* A mágica acontece aqui: dark:prose-invert */}
            <article
                className="prose prose-slate dark:prose-invert lg:prose-xl prose-headings:font-black prose-p:leading-relaxed prose-p:text-slate-600 dark:prose-p:text-slate-400"
                dangerouslySetInnerHTML={{ __html: post.content }}
            />
        </main>
    )
}