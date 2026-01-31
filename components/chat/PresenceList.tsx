'use client'
import { useEffect, useState } from 'react'
import { createClient } from '@supabase/supabase-js'
import { Users2 } from 'lucide-react'

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export default function PresenceList({ user }: { user: any }) {
    const [onlineUsers, setOnlineUsers] = useState<any[]>([])

    useEffect(() => {
        const channel = supabase.channel('online-users', {
            config: { presence: { key: user.email } }
        })

        channel
            .on('presence', { event: 'sync' }, () => {
                const state = channel.presenceState()
                const users: any[] = []
                Object.values(state).forEach((presenceArray: any) => {
                    users.push(presenceArray[0])
                })
                setOnlineUsers(users)
            })
            .subscribe(async (status) => {
                if (status === 'SUBSCRIBED') {
                    await channel.track({
                        name: user.name || 'Utilizador',
                        email: user.email,
                        online_at: new Date().toISOString(),
                    })
                }
            })

        return () => { channel.unsubscribe() }
    }, [user])

    return (
        <div className="flex items-center gap-4 bg-white/50 dark:bg-slate-900/50 p-2 pr-4 rounded-2xl border border-slate-100 dark:border-slate-800 backdrop-blur-sm shadow-sm transition-all">
            <div className="flex -space-x-3 overflow-hidden p-1">
                {onlineUsers.map((u, i) => (
                    <div
                        key={i}
                        title={u.name}
                        className="relative group cursor-help"
                    >
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 border-2 border-white dark:border-slate-950 flex items-center justify-center text-[11px] text-white font-black uppercase shadow-lg transition-transform group-hover:-translate-y-1 group-hover:z-10">
                            {u.name[0]}
                        </div>
                        <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-white dark:border-slate-950 rounded-full shadow-sm" />
                    </div>
                ))}
            </div>

            <div className="flex flex-col">
                <div className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400">
                    <Users2 size={12} className="animate-pulse" />
                    <p className="text-[10px] font-black uppercase tracking-tighter">Ativos Agora</p>
                </div>
                <p className="text-[11px] font-bold text-slate-500 dark:text-slate-400 leading-none">
                    {onlineUsers.length} {onlineUsers.length === 1 ? 'membro' : 'membros'} online
                </p>
            </div>
        </div>
    )
}