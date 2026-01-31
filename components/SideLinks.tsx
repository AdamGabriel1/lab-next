'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
    Home,
    LayoutDashboard,
    MessageSquare,
    DollarSign,
    Link2,
    FileText,
    Trello,
    Quote,
    Coins,
    FolderGit2,
    Heart,
    Settings
} from 'lucide-react'

export default function SideLinks({ session }: { session: any }) {
    const pathname = usePathname()

    const links = [
        { name: 'Início', href: '/', icon: Home },
        { name: 'Hub Principal', href: '/lab/hub', icon: LayoutDashboard },
        { name: 'Chat Real-time', href: '/lab/chat', icon: MessageSquare },
        { name: 'Finanças', href: '/lab/financas', icon: DollarSign },
        { name: 'Encurtador', href: '/lab/encurtador', icon: Link2 },
        { name: 'CMS Blog', href: '/lab/cms', icon: FileText },
        { name: 'Kanban', href: '/lab/kanban', icon: Trello },
        { name: 'Citações', href: '/lab/citacoes', icon: Quote },
        { name: 'Crypto', href: '/lab/crypto', icon: Coins },
        { name: 'Portfólio MDX', href: '/lab/projetos', icon: FolderGit2 },
        { name: 'Wishlist', href: '/lab/wishlist', icon: Heart },
    ]

    return (
        <div className="flex flex-col gap-1.5 md:gap-1">
            {links.map((link) => {
                const Icon = link.icon
                const isActive = pathname === link.href

                return (
                    <Link
                        key={link.href}
                        href={link.href}
                        className={`
                            text-[15px] md:text-sm font-bold px-4 py-4 md:py-3 rounded-2xl md:rounded-xl transition-all flex items-center gap-3 
                            ${isActive
                                ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20 dark:shadow-blue-900/40'
                                : 'text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/50 hover:text-slate-900 dark:hover:text-slate-100'
                            }
                        `}
                    >
                        <div className={`transition-transform duration-300 ${isActive ? 'scale-110' : 'group-hover:scale-110'}`}>
                            <Icon size={20} strokeWidth={isActive ? 2.5 : 2} />
                        </div>
                        {link.name}
                    </Link>
                )
            })}

            {session && (
                <Link
                    href="/lab/encurtador/admin"
                    className={`
                        text-[15px] md:text-sm font-black px-4 py-4 md:py-3 rounded-2xl md:rounded-xl mt-6 border-2 flex items-center gap-3 transition-all uppercase tracking-widest
                        ${pathname === '/lab/encurtador/admin'
                            ? 'border-blue-600 bg-blue-600 text-white shadow-lg'
                            : 'border-slate-100 dark:border-slate-800 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/30'
                        }
                    `}
                >
                    <Settings size={20} />
                    Painel Admin
                </Link>
            )}
        </div>
    )
}