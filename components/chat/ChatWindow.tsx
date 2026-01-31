// components/chat/ChatWindow.tsx
'use client'
import { useEffect, useState, useRef } from 'react'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export default function ChatWindow({ initialMessages, currentUserEmail }: any) {
    const [messages, setMessages] = useState(initialMessages)
    const scrollRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const channel = supabase
            .channel('schema-db-changes')
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
        <div className="flex flex-col h-[500px] bg-slate-50 dark:bg-slate-950/50 rounded-2xl overflow-hidden transition-colors">
            <div className="flex-1 overflow-y-auto p-6 space-y-4 custom-scrollbar">
                {messages.map((msg: any) => (
                    <div
                        key={msg.id}
                        className={`flex flex-col ${msg.user_email === currentUserEmail ? 'items-end' : 'items-start'}`}
                    >
                        <span className="text-[9px] font-black text-slate-400 dark:text-slate-500 mb-1 px-2 uppercase tracking-tighter">
                            {msg.user_name}
                        </span>
                        <div className={`max-w-[85%] p-3 px-4 rounded-2xl text-sm shadow-sm font-medium ${msg.user_email === currentUserEmail
                                ? 'bg-blue-600 text-white rounded-tr-none'
                                : 'bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-100 dark:border-slate-700 rounded-tl-none'
                            }`}>
                            {msg.text}
                        </div>
                    </div>
                ))}
                <div ref={scrollRef} />
            </div>
        </div>
    )
}