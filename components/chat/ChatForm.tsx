'use client'

import { useRef, useState } from 'react'
import { sendMessage } from '@/projects/chat/actions'
import { SendHorizontal, Loader2 } from 'lucide-react'

export default function ChatForm() {
    const formRef = useRef<HTMLFormElement>(null)
    const [isSending, setIsSending] = useState(false)

    async function handleAction(formData: FormData) {
        const message = formData.get('message') as string
        if (!message.trim()) return

        setIsSending(true)
        const result = await sendMessage(formData)

        if (result?.error) {
            alert(result.error)
        } else {
            formRef.current?.reset()
        }
        setIsSending(false)
    }

    return (
        <form
            ref={formRef}
            action={handleAction}
            className="mt-6 flex items-center gap-3 bg-white dark:bg-slate-900 p-2 pl-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-lg focus-within:border-blue-500 transition-all"
        >
            <input
                name="message"
                autoComplete="off"
                placeholder="Escreva sua mensagem técnica..."
                className="flex-1 bg-transparent py-3 text-sm outline-none dark:text-white placeholder:text-slate-400 font-medium"
                required
                disabled={isSending}
            />

            <button
                type="submit"
                disabled={isSending}
                className="bg-slate-900 dark:bg-blue-600 text-white p-4 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-blue-600 dark:hover:bg-blue-700 transition-all shadow-xl active:scale-95 disabled:opacity-50 flex items-center gap-2"
            >
                {isSending ? (
                    <Loader2 size={18} className="animate-spin" />
                ) : (
                    <>
                        <span>Enviar</span>
                        <SendHorizontal size={16} />
                    </>
                )}
            </button>
        </form>
    )
}