import Link from 'next/link'
import { auth } from '@/app/auth'
import SideLinks from './SideLinks'
import { ThemeToggle } from './ThemeToggle'

export default async function Sidebar() {
    const session = await auth()

    return (
        <div className="h-full flex flex-col p-6 transition-colors duration-300">
            {/* Logo */}
            <div className="mb-10 flex items-center justify-between">
                <div>
                    <Link href="/lab/hub" className="font-black text-2xl tracking-tighter text-blue-600 dark:text-blue-400">
                        LAB.NEXT
                    </Link>
                    <div className="mt-1">
                        <span className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-md border border-slate-200 dark:border-slate-700">
                            v2.0
                        </span>
                    </div>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
                <SideLinks session={session} />
            </div>

            <div className="mt-auto pt-6 border-t border-slate-100 dark:border-slate-800 space-y-4">
                <div className="flex items-center justify-between px-2">
                    <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                        Aparência
                    </span>
                    <ThemeToggle />
                </div>

                {session?.user && (
                    <div className="bg-slate-50 dark:bg-slate-800/50 p-3 rounded-2xl border border-slate-100 dark:border-slate-800">
                        <p className="text-[9px] font-black text-slate-400 dark:text-slate-500 uppercase mb-1">Conta Ativa</p>
                        <p className="text-xs font-bold text-slate-700 dark:text-slate-200 truncate">
                            {session.user.email}
                        </p>
                    </div>
                )}
            </div>
        </div>
    )
}