import fs from 'fs';
import path from 'path';
import Link from 'next/link';
import matter from 'gray-matter';
import { FolderCode, ArrowUpRight, Cpu, Layers } from 'lucide-react';

export default function ListaProjetos() {
    const contentDir = path.join(process.cwd(), 'content');

    if (!fs.existsSync(contentDir)) {
        return (
            <div className="p-20 text-center flex flex-col items-center gap-4">
                <div className="bg-slate-100 dark:bg-slate-800 p-6 rounded-full text-slate-300">
                    <FolderCode size={48} />
                </div>
                <p className="font-black uppercase tracking-widest text-xs text-slate-400">Nenhum artefato encontrado.</p>
            </div>
        );
    }

    const files = fs.readdirSync(contentDir);

    const projetos = files.map((filename) => {
        const slug = filename.replace('.mdx', '');
        const filePath = path.join(contentDir, filename);
        const fileContent = fs.readFileSync(filePath, 'utf-8');
        const { data } = matter(fileContent);

        return {
            slug,
            title: data.title || 'Projeto sem título',
            description: data.description || 'Sem descrição disponível.',
            tags: data.tags || ['Research'],
        };
    });

    return (
        <main className="max-w-6xl mx-auto p-4 md:p-12 min-h-screen">
            <header className="mb-20 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
                <div className="space-y-4">
                    <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400">
                        <Cpu size={18} />
                        <span className="text-[10px] font-black uppercase tracking-[0.4em]">Project Repository</span>
                    </div>
                    <h1 className="text-6xl font-black text-slate-900 dark:text-white tracking-tighter uppercase italic leading-none">
                        Lab<span className="text-blue-600">.</span>Docs
                    </h1>
                    <p className="text-slate-500 dark:text-slate-400 font-medium max-w-md italic">
                        Documentação técnica, estudos de caso e explorações de engenharia de software.
                    </p>
                </div>

                <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-800/50 px-4 py-2 rounded-full border border-slate-200 dark:border-slate-700">
                    <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">{projetos.length} Projetos</span>
                </div>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {projetos.map((p) => (
                    <Link
                        key={p.slug}
                        href={`/lab/projetos/${p.slug}`}
                        className="group relative bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[2.5rem] p-10 transition-all duration-500 hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.1)] dark:hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.5)] hover:-translate-y-2 flex flex-col justify-between min-h-[320px] overflow-hidden"
                    >
                        {/* Detalhe Decorativo de Fundo */}
                        <div className="absolute top-0 right-0 p-8 opacity-[0.03] dark:opacity-[0.05] group-hover:opacity-10 transition-opacity">
                            <Layers size={140} />
                        </div>

                        <div>
                            <div className="flex flex-wrap gap-2 mb-6">
                                {p.tags.map((tag: string) => (
                                    <span key={tag} className="text-[9px] font-black uppercase tracking-widest bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 px-3 py-1 rounded-lg border border-blue-100 dark:border-blue-500/20">
                                        {tag}
                                    </span>
                                ))}
                            </div>

                            <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tighter leading-tight mb-4 group-hover:text-blue-600 transition-colors">
                                {p.title}
                            </h2>
                            <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed line-clamp-3 italic">
                                {p.description}
                            </p>
                        </div>

                        <div className="mt-8 pt-6 border-t border-slate-50 dark:border-slate-800 flex items-center justify-between">
                            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Case Study</span>
                            <div className="w-10 h-10 rounded-xl bg-slate-900 dark:bg-blue-600 flex items-center justify-center text-white group-hover:scale-110 group-hover:rotate-12 transition-all">
                                <ArrowUpRight size={20} />
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </main>
    );
}