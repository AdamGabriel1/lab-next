// app/hub/page.tsx
import { auth } from '@/app/auth'
import { createClient } from '@supabase/supabase-js'
import Link from 'next/link'
import StatCard from '@/components/hub/StatCard'
import { AnimatedGrid, itemVariants } from '@/components/hub/AnimatedGrid'
import * as motion from 'framer-motion/client'
import {
    MessageSquare,
    DollarSign,
    Link2,
    FileText,
    Trello,
    Quote,
    Coins,
    FolderGit2,
    Heart
} from 'lucide-react'

export default async function HubPage() {
    const session = await auth()
    const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!)

    const [linksRes, transRes, postsRes] = await Promise.all([
        supabase.from('links').select('*', { count: 'exact', head: true }),
        supabase.from('transactions').select('amount, type'),
        supabase.from('posts').select('*', { count: 'exact', head: true })
    ])

    const linksCount = linksRes.count || 0
    const postsCount = postsRes.count || 0
    const total = transRes.data?.reduce((acc, t) =>
        t.type === 'income' ? acc + Number(t.amount) : acc - Number(t.amount), 0) || 0

    const projects = [
        { icon: MessageSquare, title: "Chat Real-time", desc: "Comunicação via WebSocket.", href: "/lab/chat" },
        { icon: DollarSign, title: "Finanças", desc: "Gestão de fluxo de caixa.", href: "/lab/financas" },
        { icon: Link2, title: "Encurtador", desc: "Links curtos e QR Codes.", href: "/lab/encurtador" },
        { icon: FileText, title: "CMS Blog", desc: "Editor de texto rico.", href: "/lab/cms" },
        { icon: Trello, title: "Kanban", desc: "Gestão visual de tarefas.", href: "/lab/kanban" },
        { icon: Quote, title: "Citações", desc: "Gerador de frases com API.", href: "/lab/citacoes" },
        { icon: Coins, title: "Crypto Lab", desc: "Preços em tempo real.", href: "/lab/crypto" },
        { icon: FolderGit2, title: "Portfólio", desc: "Documentação em MDX.", href: "/lab/projetos" },
        { icon: Heart, title: "Wishlist", desc: "Lista de desejos.", href: "/lab/wishlist" },
    ]

    return (
        <main className="min-h-screen p-8 lg:p-12 transition-colors duration-500">
            <div className="max-w-6xl mx-auto">

                <header className="mb-16">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="relative flex h-3 w-3">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                        </div>
                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-100 dark:border-emerald-500/20">
                            Sistema Ativo
                        </span>
                    </div>

                    <h1 className="text-6xl md:text-7xl font-black text-slate-900 dark:text-white tracking-tighter mb-6 leading-none italic">
                        LAB.CONTROL<span className="text-blue-600 dark:text-blue-500">.</span>
                    </h1>
                    <p className="text-lg text-slate-500 dark:text-slate-400 font-medium max-w-2xl leading-relaxed">
                        Bem-vindo ao centro de comando, <span className="text-slate-900 dark:text-slate-100 font-bold underline decoration-blue-500 underline-offset-4">{session?.user?.name || 'Dev'}</span>.
                        Métricas consolidadas de 9 micro-serviços integrados.
                    </p>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
                    <StatCard title="Links Encurtados" value={linksCount} unit="URLs Ativas" color="bg-blue-500" />
                    <StatCard title="Saldo em Carteira" value={`R$ ${total.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`} unit="Financeiro" color="bg-emerald-500" />
                    <StatCard title="Artigos no Blog" value={postsCount} unit="CMS Posts" color="bg-purple-500" />
                </div>

                <section>
                    <div className="flex items-center gap-6 mb-10">
                        <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400 dark:text-slate-600">Projetos Ativos</h2>
                        <div className="h-[1px] flex-1 bg-slate-100 dark:bg-slate-800" />
                    </div>

                    <AnimatedGrid>
                        {projects.map((p, i) => (
                            <motion.div key={i} variants={itemVariants} className="h-full">
                                <ProjectLink
                                    icon={p.icon}
                                    title={p.title}
                                    desc={p.desc}
                                    href={p.href}
                                // Adicione uma prop compacta se quiser
                                />
                            </motion.div>
                        ))}
                    </AnimatedGrid>
                </section>
            </div>
        </main>
    )
}

function ProjectLink({ title, desc, href, icon: Icon }: { title: string, desc: string, href: string, icon: any }) {
    return (
        <Link href={href} className="group relative bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 hover:border-blue-500 dark:hover:border-blue-500 hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-500 flex flex-col gap-6 overflow-hidden h-full">
            {/* Ícone de fundo decorativo */}
            <div className="absolute -top-6 -right-6 opacity-[0.03] dark:opacity-[0.05] group-hover:opacity-[0.1] group-hover:scale-110 transition-all text-slate-900 dark:text-white pointer-events-none">
                <Icon size={140} />
            </div>

            <div className="bg-slate-50 dark:bg-slate-800 w-14 h-14 rounded-2xl flex items-center justify-center text-slate-600 dark:text-slate-400 group-hover:bg-blue-600 group-hover:text-white group-hover:rotate-6 transition-all relative z-10 shadow-inner">
                <Icon size={28} />
            </div>

            <div className="relative z-10">
                <h3 className="font-black text-xl text-slate-900 dark:text-white mb-2 tracking-tight group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {title}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-bold uppercase tracking-wider opacity-80">
                    {desc}
                </p>
            </div>
        </Link>
    )
}