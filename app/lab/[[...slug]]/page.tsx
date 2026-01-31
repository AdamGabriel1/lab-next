import { notFound } from 'next/navigation';
import dynamic from 'next/dynamic';

interface ProjetoProps {
    params: Promise<{ slug: string[] }>;
}

export default async function LabRouter({ params }: { params: Promise<{ slug?: string[] }> }) {
    const { slug } = await params;

    if (!slug || slug.length === 0) return notFound();

    const modulo = slug[0]; // "encurtador", "projetos", etc.

    // --- CASO 1: ENCURTADOR (Com suporte a /admin) ---
    if (modulo === 'encurtador') {
        // Se a URL for /lab/encurtador/admin (slug.length === 2)
        // Nota: slug[0] é "encurtador", slug[1] é "admin"
        if (slug.length === 2 && slug[1] === 'admin') {
            const AdminPage = dynamic<ProjetoProps>(() => import('@/projects/encurtador/admin/page'));
            return <AdminPage params={Promise.resolve({ slug })} />;
        }

        // Se for apenas /lab/encurtador
        const EncurtadorHome = dynamic<ProjetoProps>(() => import('@/projects/encurtador/page'));
        return <EncurtadorHome params={Promise.resolve({ slug })} />;
    }

    // --- CASO 2: PROJETOS MDX ---
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

    // --- CASO GERAL: Outros projetos ---
    const ProjetoComponent = dynamic<any>(
        () => import(`@/projects/${modulo}/page`).catch(() => () => notFound()),
        { loading: () => <p className="p-10 text-xs font-black uppercase animate-pulse">Iniciando...</p> }
    );

    return <ProjetoComponent params={Promise.resolve({ slug })} />;
}