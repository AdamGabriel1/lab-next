// components/chat/PresenceList.tsx
'use client'
import { useEffect, useState } from 'react'
import { createClient } from '@supabase/supabase-js'

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
                const users = Object.values(state).flat()
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
        <div className="flex items-center gap-3 py-2">
            <div className="flex -space-x-2">
                {onlineUsers.map((u, i) => (
                    <div
                        key={i}
                        title={u.name}
                        className="w-8 h-8 rounded-full bg-blue-500 border-2 border-white dark:border-slate-950 flex items-center justify-center text-[10px] text-white font-black uppercase ring-2 ring-transparent hover:ring-blue-400 transition-all"
                    >
                        {u.name[0]}
                    </div>
                ))}
            </div>
            <div className="flex items-center gap-1.5 bg-emerald-50 dark:bg-emerald-500/10 px-3 py-1.5 rounded-full border border-emerald-100 dark:border-emerald-500/20">
                <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                <p className="text-[10px] font-black text-emerald-600 dark:text-emerald-400 uppercase tracking-widest">
                    {onlineUsers.length} Online
                </p>
            </div>
        </div>
    )
}