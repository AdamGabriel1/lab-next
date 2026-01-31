'use client'
import { useState } from 'react'
import Editor from '@/components/cms/Editor'
import { createPost } from '@/projects/cms/novo/actions'
import { useRouter } from 'next/navigation'

export default function PostForm() {
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [loading, setLoading] = useState(false)
    const router = useRouter()

    const handleSave = async () => {
        if (!title || !content) return alert("Preencha tudo!")
        setLoading(true)
        const res = await createPost(title, content)
        if (res?.success) router.push('/cms')
        else alert("Erro ao salvar post")
        setLoading(false)
    }

    return (
        <div className="transition-colors">
            <div className="mb-10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
                <h1 className="text-4xl font-black text-slate-900 dark:text-white tracking-tighter italic underline decoration-blue-600 underline-offset-8">Novo Artigo</h1>
                <button
                    onClick={handleSave}
                    disabled={loading}
                    className="bg-emerald-600 dark:bg-emerald-500 text-white px-10 py-4 rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-emerald-700 dark:hover:bg-emerald-600 transition-all shadow-xl shadow-emerald-500/10 disabled:opacity-50 active:scale-95"
                >
                    {loading ? 'PUBLICANDO...' : 'Publicar Agora'}
                </button>
            </div>

            <input
                type="text"
                placeholder="Qual o título do seu post?"
                className="w-full text-4xl md:text-5xl font-black mb-8 outline-none bg-transparent text-slate-900 dark:text-white placeholder:text-slate-200 dark:placeholder:text-slate-800 tracking-tight"
                onChange={(e) => setTitle(e.target.value)}
            />

            <Editor onChange={setContent} />
        </div>
    )
}