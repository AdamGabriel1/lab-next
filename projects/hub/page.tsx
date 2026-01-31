import { auth } from '@/app/auth'
import { createClient } from '@supabase/supabase-js'
import Link from 'next/link'
import StatCard from '@/components/hub/StatCard'
import { AnimatedGrid, itemVariants } from '@/components/hub/AnimatedGrid'
import * as motion from 'framer-motion/client'
import {
    MessageSquare, DollarSign, Link2, FileText,
    Trello, Quote, Coins, FolderGit2, Heart,
    Zap, Activity, LayoutGrid
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
        { icon: MessageSquare, title: "Chat Real-time", desc: "WebSocket Protocol", href: "/lab/chat", tag: "Live" },
        { icon: DollarSign, title: "Finanças", desc: "Fluxo de Caixa", href: "/lab/financas", tag: "Ledger" },
        { icon: Link2, title: "Encurtador", desc: "Shortener & QR", href: "/lab/encurtador", tag: "Network" },
        { icon: FileText, title: "CMS Blog", desc: "Rich Text Engine", href: "/lab/cms", tag: "Publish" },
        { icon: Trello, title: "Kanban", desc: "Task Management", href: "/lab/kanban", tag: "Sprint" },
        { icon: Quote, title: "Citações", desc: "External API", href: "/lab/citacoes", tag: "Utility" },
        { icon: Coins, title: "Crypto Lab", desc: "Market Monitor", href: "/lab/crypto", tag: "Ticker" },
        { icon: FolderGit2, title: "Portfólio", desc: "MDX Static Generation", href: "/lab/projetos", tag: "Docs" },
        { icon: Heart, title: "Wishlist", desc: "Goal Tracking", href: "/lab/wishlist", tag: "Vision" },
    ]

    return (
        <main className="min-h-screen p-6 lg:p-12 bg-[#f8fafc] dark:bg-[#020617] transition-colors duration-700">
            <div className="max-w-6xl mx-auto">

                {/* Header Estilo Centro de Comando */}
                <header className="mb-20">
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
                        <div className="space-y-6">
                            <div className="flex items-center gap-4">
                                <div className="flex items-center gap-2 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 px-4 py-1.5 rounded-2xl border border-emerald-500/20">
                                    <div className="relative h-2 w-2">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                                    </div>
                                    <span className="text-[10px] font-black uppercase tracking-[0.2em]">Sistemas Operacionais</span>
                                </div>
                                <div className="hidden md:flex items-center gap-2 text-slate-400 text-[10px] font-black uppercase tracking-widest">
                                    <Activity size={14} />
                                    <span>Latência: 14ms</span>
                                </div>
                            </div>

                            <h1 className="text-7xl md:text-8xl font-black text-slate-900 dark:text-white tracking-tighter leading-[0.8] italic uppercase">
                                Lab<span className="text-blue-600">.</span>Ctrl
                            </h1>

                            <p className="text-lg text-slate-500 dark:text-slate-400 font-medium max-w-xl leading-relaxed italic">
                                Autenticado como <span className="text-slate-900 dark:text-white font-black underline decoration-blue-500 underline-offset-8">@{session?.user?.name?.toLowerCase().replace(' ', '_') || 'operator'}</span>.
                                Orquestrando 9 micro-serviços em tempo real.
                            </p>
                        </div>

                        {/* Quick Action Button */}
                        <div className="flex items-center gap-4">
                            <div className="text-right hidden lg:block">
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Build Status</p>
                                <p className="text-xs font-bold text-emerald-500">v4.2.0 Stable</p>
                            </div>
                            <div className="h-16 w-16 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl flex items-center justify-center text-blue-600 shadow-xl">
                                <Zap size={24} fill="currentColor" />
                            </div>
                        </div>
                    </div>
                </header>

                {/* Métricas com Layout Melhorado */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
                    <StatCard
                        title="Database Index"
                        value={linksCount}
                        unit="URLs Redirecionadas"
                        color="bg-blue-500"
                        trend="+12%"
                    />
                    <StatCard
                        title="Liquidez Total"
                        value={`R$ ${total.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`}
                        unit="Patrimônio Lab"
                        color="bg-emerald-500"
                        trend="Balanceado"
                    />
                    <StatCard
                        title="Knowledge Base"
                        value={postsCount}
                        unit="Documentos CMS"
                        color="bg-purple-500"
                        trend="Atualizado"
                    />
                </div>

                {/* Grid de Projetos */}
                <section>
                    <div className="flex items-center justify-between mb-12">
                        <div className="flex items-center gap-4">
                            <LayoutGrid size={20} className="text-blue-600" />
                            <h2 className="text-[11px] font-black uppercase tracking-[0.5em] text-slate-400 dark:text-slate-600">Módulos de Execução</h2>
                        </div>
                        <div className="h-[1px] flex-1 mx-8 bg-gradient-to-r from-slate-100 dark:from-slate-800 to-transparent" />
                    </div>

                    <AnimatedGrid>
                        {projects.map((p, i) => (
                            <motion.div key={i} variants={itemVariants}>
                                <ProjectLink {...p} />
                            </motion.div>
                        ))}
                    </AnimatedGrid>
                </section>
            </div>
        </main>
    )
}

function ProjectLink({ title, desc, href, icon: Icon, tag }: any) {
    return (
        <Link href={href} className="group relative bg-white dark:bg-slate-900 p-8 rounded-[3rem] border border-slate-200 dark:border-slate-800 hover:border-blue-500 dark:hover:border-blue-500 transition-all duration-500 flex flex-col justify-between min-h-[220px] overflow-hidden">
            {/* Background Pattern Sutil */}
            <div className="absolute inset-0 opacity-[0.02] dark:opacity-[0.03] pointer-events-none group-hover:opacity-[0.05] transition-opacity">
                <Icon size={200} className="absolute -right-10 -bottom-10" />
            </div>

            <div className="flex justify-between items-start relative z-10">
                <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-2xl text-slate-600 dark:text-slate-400 group-hover:bg-blue-600 group-hover:text-white group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                    <Icon size={24} />
                </div>
                <span className="text-[8px] font-black uppercase tracking-[0.2em] bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-full text-slate-500 dark:text-slate-400 group-hover:bg-blue-500/10 group-hover:text-blue-500 transition-colors">
                    {tag}
                </span>
            </div>

            <div className="relative z-10">
                <h3 className="text-2xl font-black text-slate-900 dark:text-white tracking-tighter mb-1 group-hover:translate-x-1 transition-transform">
                    {title}
                </h3>
                <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest leading-tight">
                    {desc}
                </p>
            </div>
        </Link>
    )
}