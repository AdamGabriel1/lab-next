'use client'
import { useEffect, useState, useRef } from 'react'
import { createClient } from '@supabase/supabase-js'
import { User, ShieldCheck } from 'lucide-react'

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export default function ChatWindow({ initialMessages, currentUserEmail }: any) {
    const [messages, setMessages] = useState(initialMessages)
    const scrollRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const channel = supabase
            .channel('chat-lab')
            .on('postgres_changes',
                { event: 'INSERT', schema: 'public', table: 'messages' },
                (payload) => {
                    setMessages((prev: any) => [...prev, payload.new])
                }
            )
            .subscribe()

        return () => { supabase.removeChannel(channel) }
    }, [])

    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, [messages])

    return (
        <div className="flex flex-col h-[600px] bg-white dark:bg-[#0d111a] rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden transition-all">
            {/* Header do Chat */}
            <div className="p-5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50/50 dark:bg-slate-900/50">
                <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">Encrypted Channel</span>
                </div>
                <ShieldCheck size={16} className="text-blue-500" />
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-hide">
                {messages.map((msg: any) => {
                    const isMe = msg.user_email === currentUserEmail;
                    return (
                        <div
                            key={msg.id}
                            className={`flex flex-col ${isMe ? 'items-end' : 'items-start'} animate-in fade-in slide-in-from-bottom-2 duration-300`}
                        >
                            <div className={`flex items-center gap-2 mb-1 px-1 ${isMe ? 'flex-row-reverse' : 'flex-row'}`}>
                                <div className="w-4 h-4 rounded bg-slate-200 dark:bg-slate-800 flex items-center justify-center">
                                    <User size={10} className="text-slate-500" />
                                </div>
                                <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">
                                    {isMe ? 'Você' : msg.user_name}
                                </span>
                            </div>

                            <div className={`relative max-w-[80%] p-4 rounded-[1.5rem] text-sm font-medium leading-relaxed shadow-sm transition-all ${isMe
                                    ? 'bg-blue-600 text-white rounded-tr-none shadow-blue-500/10'
                                    : 'bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 rounded-tl-none border border-slate-200 dark:border-slate-700'
                                }`}>
                                {msg.text}
                            </div>

                            <span className="text-[8px] mt-1 font-bold text-slate-300 dark:text-slate-600 uppercase tracking-tighter">
                                {new Date(msg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </span>
                        </div>
                    );
                })}
                <div ref={scrollRef} />
            </div>
        </div>
    )
}