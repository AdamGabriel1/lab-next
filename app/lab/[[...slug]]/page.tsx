import { notFound } from 'next/navigation';
import dynamic from 'next/dynamic';

interface ProjetoProps {
    params: Promise<{ slug: string[] }>;
}

export default async function LabRouter({ params }: { params: Promise<{ slug?: string[] }> }) {
    const { slug } = await params;

    if (!slug || slug.length === 0) return notFound();

    const modulo = slug[0]; // "encurtador", "cms", "financas", etc.

    // --- CASO 1: ENCURTADOR (Home e Admin) ---
    if (modulo === 'encurtador') {
        if (slug.length === 2 && slug[1] === 'admin') {
            const AdminPage = dynamic<ProjetoProps>(() => import('@/projects/encurtador/admin/page'));
            return <AdminPage params={Promise.resolve({ slug })} />;
        }
        const EncurtadorHome = dynamic<ProjetoProps>(() => import('@/projects/encurtador/page'));
        return <EncurtadorHome params={Promise.resolve({ slug })} />;
    }

    // --- CASO 2: CMS (Blog com Post e Novo) ---
    if (modulo === 'cms') {
        // Rota: /lab/cms/novo
        if (slug.length === 2 && slug[1] === 'novo') {
            const NovoPost = dynamic<any>(() => import('@/projects/cms/novo/page'));
            return <NovoPost />;
        }
        // Rota: /lab/cms/post/[id] (slug.length === 3)
        if (slug.length === 3 && slug[1] === 'post') {
            const PostDetail = dynamic<any>(() => import('@/projects/cms/post/[id]/page'));
            // Passamos o ID corretamente para o componente
            return <PostDetail params={Promise.resolve({ id: slug[2] })} />;
        }
        // Rota: /lab/cms
        const CMSHome = dynamic<any>(() => import('@/projects/cms/page'));
        return <CMSHome />;
    }

    // --- CASO 3: PROJETOS MDX ---
    if (modulo === 'projetos') {
        if (slug.length === 1) {
            const Lista = dynamic<any>(() => import('@/projects/projetos/page'));
            return <Lista />;
        }
        if (slug.length === 2) {
            const Artigo = dynamic<ProjetoProps>(() => import('@/projects/projetos/[slug]/page'));
            return <Artigo params={Promise.resolve({ slug })} />;
        }
    }

    // --- CASO GERAL: Outros projetos (Financas, Chat, etc) ---
    const ProjetoComponent = dynamic<any>(
        () => import(`@/projects/${modulo}/page`).catch(() => () => notFound()),
        { loading: () => <div className="p-20 flex justify-center items-center"><p className="text-[10px] font-black uppercase tracking-[0.4em] animate-pulse">Iniciando Sistema...</p></div> }
    );

    return <ProjetoComponent params={Promise.resolve({ slug })} />;
}