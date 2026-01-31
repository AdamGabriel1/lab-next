import fs from 'fs'
import path from 'path'
import { compileMDX } from 'next-mdx-remote/rsc'
import Link from 'next/link'
import { ChevronLeft, BookOpen, Clock, Hash } from 'lucide-react'

export default async function ProjetoPage({ params }: { params: Promise<{ slug: string[] }> }) {
    const { slug } = await params;
    const fileName = slug[slug.length - 1];
    const filePath = path.join(process.cwd(), 'content', `${fileName}.mdx`);

    try {
        if (!fs.existsSync(filePath)) return <div className="p-20 text-center font-black uppercase tracking-widest text-red-500">404: Arquivo Corrompido ou Inexistente</div>;

        const source = fs.readFileSync(filePath, 'utf8');
        const { content, frontmatter } = await compileMDX<{ title: string, description?: string, date?: string }>({
            source,
            options: { parseFrontmatter: true }
        });

        return (
            <main className="min-h-screen bg-white dark:bg-[#080b14] transition-colors">
                {/* Header de Leitura */}
                <header className="bg-slate-50 dark:bg-slate-900/50 border-b border-slate-100 dark:border-slate-800 py-12 md:py-24">
                    <div className="max-w-4xl mx-auto px-6">
                        <Link href="/lab/projetos" className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-blue-600 mb-8 hover:gap-4 transition-all">
                            <ChevronLeft size={14} /> Voltar para o Índice
                        </Link>

                        <h1 className="text-5xl md:text-7xl font-black text-slate-900 dark:text-white tracking-tighter uppercase italic leading-[0.9] mb-8">
                            {frontmatter.title}
                        </h1>

                        <div className="flex flex-wrap items-center gap-6 text-[10px] font-black uppercase tracking-widest text-slate-400">
                            <div className="flex items-center gap-2">
                                <BookOpen size={14} className="text-blue-500" />
                                <span>Technical Doc</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Clock size={14} className="text-blue-500" />
                                <span>Estudo de Caso</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Hash size={14} className="text-blue-500" />
                                <span>{fileName}</span>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Conteúdo MDX */}
                <article className="max-w-4xl mx-auto px-6 py-16 md:py-24">
                    <div className="prose prose-slate dark:prose-invert lg:prose-xl 
                        prose-headings:font-black prose-headings:tracking-tighter prose-headings:uppercase prose-headings:italic
                        prose-p:text-slate-600 dark:prose-p:text-slate-400 prose-p:leading-[1.8]
                        prose-strong:text-slate-900 dark:prose-strong:text-white
                        prose-pre:bg-slate-900 dark:prose-pre:bg-slate-950 prose-pre:rounded-[2rem] prose-pre:border prose-pre:border-slate-800 prose-pre:shadow-2xl
                        prose-img:rounded-[2.5rem] prose-img:shadow-2xl
                        prose-a:text-blue-600 dark:prose-a:text-blue-400 prose-a:no-underline hover:prose-a:underline
                        prose-code:bg-blue-50 dark:prose-code:bg-blue-500/10 prose-code:p-1 prose-code:rounded-lg prose-code:text-blue-600 dark:prose-code:text-blue-400 prose-code:before:content-none prose-code:after:content-none"
                    >
                        {content}
                    </div>

                    <footer className="mt-24 pt-12 border-t border-slate-100 dark:border-slate-800 flex flex-col items-center gap-6">
                        <p className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-300">Fim da Documentação</p>
                        <Link href="/lab/projetos" className="bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-8 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:scale-105 transition-transform shadow-xl">
                            Explorar Outros Artefatos
                        </Link>
                    </footer>
                </article>
            </main>
        );
    } catch (e) {
        return (
            <div className="min-h-screen flex items-center justify-center flex-col gap-4">
                <p className="text-red-500 font-black uppercase tracking-widest text-xs">Erro crítico de renderização.</p>
                <Link href="/lab/projetos" className="text-blue-600 font-bold underline">Voltar</Link>
            </div>
        );
    }
}