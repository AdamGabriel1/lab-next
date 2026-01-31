'use client'

import { useRef } from 'react'
import { sendMessage } from '@/projects/chat/actions'

export default function ChatForm() {
    const formRef = useRef<HTMLFormElement>(null)

    async function handleAction(formData: FormData) {
        const result = await sendMessage(formData)

        if (result?.error) {
            alert(result.error)
            return
        }

        formRef.current?.reset()
    }

    return (
        <form
            ref={formRef}
            action={handleAction}
            className="mt-4 flex gap-2"
        >
            <input
                name="message"
                placeholder="Digite sua mensagem..."
                className="flex-1 p-4 rounded-2xl border border-slate-200 outline-none focus:border-blue-500 shadow-sm"
                required
            />
            <button
                type="submit"
                className="bg-blue-600 text-white px-8 rounded-2xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-100"
            >
                ENVIAR
            </button>
        </form>
    )
}
