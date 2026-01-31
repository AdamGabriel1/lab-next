import { auth } from '@/app/auth'
import { redirect } from 'next/navigation'
import { createClient } from '@supabase/supabase-js'
import ChatWindow from '@/components/chat/ChatWindow'
import PresenceList from '@/components/chat/PresenceList'
import { sendMessage } from './actions'
import { Hash, SendHorizontal, Sparkles, MessageSquare } from 'lucide-react'

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
        <main className="max-w-5xl mx-auto p-4 md:p-10 min-h-screen flex flex-col transition-colors duration-500">

            {/* Cabeçalho de Navegação da Sala */}
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-6 bg-white/50 dark:bg-slate-900/50 backdrop-blur-md p-6 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-sm">
                <div className="flex items-center gap-4">
                    <div className="bg-blue-600 p-3 rounded-2xl shadow-lg shadow-blue-500/20">
                        <MessageSquare className="text-white" size={24} />
                    </div>
                    <div>
                        <div className="flex items-center gap-2">
                            <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tighter italic uppercase">
                                Lab<span className="text-blue-600">.</span>Chat
                            </h1>
                            <span className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[10px] font-black px-2 py-0.5 rounded-full border border-emerald-500/20 uppercase tracking-tighter">
                                Live
                            </span>
                        </div>
                        <div className="flex items-center gap-1.5 text-slate-400 dark:text-slate-500">
                            <Hash size={12} className="text-blue-500" />
                            <p className="text-[10px] font-bold uppercase tracking-[0.2em]">Sala de Convivência Global</p>
                        </div>
                    </div>
                </div>

                {/* Lista de Presença Estilizada */}
                <div className="flex items-center gap-4 bg-slate-100 dark:bg-slate-800/50 p-2 pl-4 rounded-2xl border border-slate-200 dark:border-slate-800">
                    <div className="flex items-center gap-2 mr-2">
                        <Sparkles size={14} className="text-amber-500" />
                        <span className="text-[10px] font-black uppercase text-slate-500">Online</span>
                    </div>
                    <PresenceList user={session.user} />
                </div>
            </div>

            {/* Container Principal do Chat */}
            <div className="flex-1 flex flex-col bg-white dark:bg-slate-900 rounded-[3rem] border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden relative transition-all border-b-8 border-b-blue-600/20">

                {/* Janela de Mensagens */}
                <div className="flex-1 overflow-hidden relative">
                    <div className="absolute inset-0 bg-gradient-to-b from-slate-50/50 to-transparent dark:from-slate-800/20 pointer-events-none z-10 h-10" />
                    <ChatWindow
                        initialMessages={initialMessages || []}
                        currentUserEmail={session.user?.email}
                    />
                </div>

                {/* Área de Input "Floating Style" */}
                <div className="p-6 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800">
                    <form
                        action={async (formData) => {
                            'use server'
                            await sendMessage(formData)
                        }}
                        className="relative flex items-center group"
                    >
                        <input
                            name="message"
                            autoComplete="off"
                            placeholder="Envie uma mensagem para o grupo..."
                            className="w-full p-5 pr-20 rounded-[2rem] bg-slate-100 dark:bg-slate-800/50 border-2 border-transparent outline-none focus:bg-white dark:focus:bg-slate-800 focus:border-blue-500 dark:text-white transition-all text-sm font-medium placeholder:text-slate-400 dark:placeholder:text-slate-600 shadow-inner"
                            required
                        />

                        <div className="absolute right-2 p-1">
                            <button className="bg-blue-600 text-white w-12 h-12 rounded-[1.4rem] font-black hover:bg-blue-700 transition-all shadow-xl shadow-blue-500/20 active:scale-90 flex items-center justify-center group-focus-within:rotate-12">
                                <SendHorizontal size={20} strokeWidth={2.5} />
                            </button>
                        </div>
                    </form>

                    <div className="mt-3 flex justify-center items-center gap-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                        <span className="flex items-center gap-1 italic">
                            <span className="w-1 h-1 bg-blue-500 rounded-full" />
                            Markdown suportado
                        </span>
                        <span className="opacity-30">|</span>
                        <span>{session.user?.email}</span>
                    </div>
                </div>
            </div>

            {/* Nota de rodapé sutil */}
            <footer className="mt-6 text-center">
                <p className="text-[10px] font-black text-slate-400 dark:text-slate-600 uppercase tracking-[0.5em]">
                    End-to-End Test Protocol v2.6
                </p>
            </footer>
        </main>
    )
}