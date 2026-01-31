// app/chat/page.tsx
import { auth } from '@/app/auth'
import { redirect } from 'next/navigation'
import { createClient } from '@supabase/supabase-js'
import ChatWindow from '@/components/chat/ChatWindow'
import PresenceList from '@/components/chat/PresenceList'
import { sendMessage } from './actions'

export default async function ChatPage() {
    const session = await auth()
    if (!session) redirect('/login')

    const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )

    const { data: initialMessages } = await supabase
        .from('messages')
        .select('*')
        .order('created_at', { ascending: true })
        .limit(50)

    return (
        <main className="max-w-4xl mx-auto p-6 md:p-12">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
                <div>
                    <h1 className="text-4xl font-black text-slate-900 dark:text-white tracking-tighter italic">LAB.CHAT</h1>
                    <p className="text-slate-400 dark:text-slate-500 text-sm font-medium uppercase tracking-widest">Sala de Testes Real-time</p>
                </div>

                <PresenceList user={session.user} />
            </div>

            <div className="bg-white dark:bg-slate-900 rounded-[2rem] border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden p-2 transition-colors">
                <ChatWindow
                    initialMessages={initialMessages || []}
                    currentUserEmail={session.user?.email}
                />

                <form
                    action={async (formData) => {
                        'use server'
                        await sendMessage(formData)
                    }}
                    className="p-4 flex gap-2 bg-white dark:bg-slate-900"
                >
                    <input
                        name="message"
                        autoComplete="off"
                        placeholder="Escreva algo para o grupo..."
                        className="flex-1 p-4 rounded-2xl bg-slate-100 dark:bg-slate-800 border-transparent outline-none focus:bg-white dark:focus:bg-slate-700 focus:border-blue-500 dark:text-white transition-all text-sm placeholder:text-slate-400 dark:placeholder:text-slate-500"
                        required
                    />
                    <button className="bg-blue-600 text-white p-4 rounded-2xl font-black hover:bg-blue-700 transition-all shadow-lg active:scale-95 flex items-center justify-center min-w-[60px]">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                    </button>
                </form>
            </div>
        </main>
    )
}