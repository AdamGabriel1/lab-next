import fs from 'fs';
import path from 'path';
import Link from 'next/link';
import matter from 'gray-matter';

export default function ListaProjetos() {
    const contentDir = path.join(process.cwd(), 'content');

    // Fallback caso a pasta não exista
    if (!fs.existsSync(contentDir)) return <div className="p-10 text-center">Nenhum projeto encontrado.</div>;

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
        };
    });

    return (
        <main className="max-w-4xl mx-auto p-6 md:p-12 transition-colors">
            <header className="mb-12">
                <h1 className="text-4xl font-black text-slate-900 dark:text-white tracking-tighter uppercase italic">
                    Meus Projetos
                </h1>
                <p className="text-slate-500 dark:text-slate-400 font-medium mt-2">
                    Explorações técnicas e documentação de build.
                </p>
            </header>

            <div className="grid gap-6">
                {projetos.map((p) => (
                    <Link
                        key={p.slug}
                        href={`/lab/projetos/${p.slug}`}
                        className="group relative block p-8 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[2rem] hover:border-blue-500 dark:hover:border-blue-400 transition-all duration-300 shadow-sm hover:shadow-2xl"
                    >
                        <div className="flex flex-col gap-2">
                            <h2 className="text-2xl font-black text-slate-800 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                {p.title}
                            </h2>
                            <p className="text-slate-600 dark:text-slate-400 leading-relaxed max-w-2xl">
                                {p.description}
                            </p>
                        </div>

                        <div className="mt-6 flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-blue-600 dark:text-blue-400">
                            Ver detalhes do projeto
                            <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                            </svg>
                        </div>
                    </Link>
                ))}
            </div>
        </main>
    );
}