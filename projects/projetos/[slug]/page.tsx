// projects/projetos/[slug]/page.tsx
import fs from 'fs'
import path from 'path'
import { compileMDX } from 'next-mdx-remote/rsc'

export default async function ProjetoPage({ params }: { params: Promise<{ slug: string[] }> }) {
    const { slug } = await params;

    // Pega o último item do array: "meu-projeto"
    const fileName = slug[slug.length - 1];

    const filePath = path.join(process.cwd(), 'content', `${fileName}.mdx`);

    try {
        if (!fs.existsSync(filePath)) return <div>Arquivo não encontrado em: {filePath}</div>;

        const source = fs.readFileSync(filePath, 'utf8');
        const { content, frontmatter } = await compileMDX<{ title: string }>({
            source,
            options: { parseFrontmatter: true }
        });

        return (
            <div className="prose dark:prose-invert max-w-4xl mx-auto p-10">
                <h1>{frontmatter.title}</h1>
                {content}
            </div>
        );
    } catch (e) {
        return <div>Erro ao carregar o projeto.</div>;
    }
}