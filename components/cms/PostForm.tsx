'use client'
import { useState } from 'react'
import Editor from '@/components/cms/Editor'
import { createPost } from '@/projects/cms/novo/actions'
import { useRouter } from 'next/navigation'
import { Rocket, ArrowLeft, PenTool, Sparkles, Loader2 } from 'lucide-react'
import Link from 'next/link'

export default function PostForm() {
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [loading, setLoading] = useState(false)
    const router = useRouter()

    const handleSave = async () => {
        if (!title || !content) return alert("Ei! Você esqueceu de preencher o título ou o conteúdo.")

        setLoading(true)
        const res = await createPost(title, content)

        if (res?.success) {
            router.push('/cms')
        } else {
            alert("Erro ao salvar post. Verifique sua conexão.")
            setLoading(false)
        }
    }

    return (
        <div className="max-w-5xl mx-auto transition-all pb-20">
            {/* Top Navigation & Actions */}
            <nav className="mb-12 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
                <div className="flex flex-col gap-2">
                    <Link
                        href="/cms"
                        className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 hover:text-blue-600 transition-colors group"
                    >
                        <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
                        Voltar ao Painel
                    </Link>
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-blue-600 rounded-lg text-white">
                            <PenTool size={20} />
                        </div>
                        <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tighter uppercase italic">
                            Studio<span className="text-blue-600">.</span>Editor
                        </h1>
                    </div>
                </div>

                <div className="flex items-center gap-4 w-full sm:w-auto">
                    <button
                        onClick={handleSave}
                        disabled={loading}
                        className="flex-1 sm:flex-none flex items-center justify-center gap-3 bg-emerald-600 dark:bg-emerald-500 text-white px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-[11px] hover:bg-emerald-700 dark:hover:bg-emerald-400 hover:shadow-[0_20px_40px_-10px_rgba(16,185,129,0.3)] transition-all disabled:opacity-50 active:scale-95"
                    >
                        {loading ? (
                            <Loader2 size={18} className="animate-spin" />
                        ) : (
                            <>
                                <span>Publicar Artigo</span>
                                <Rocket size={18} />
                            </>
                        )}
                    </button>
                </div>
            </nav>

            {/* Input de Título de Grande Impacto */}
            <div className="relative mb-12 group">
                <div className="flex items-center gap-2 mb-4 opacity-0 group-focus-within:opacity-100 transition-opacity">
                    <Sparkles size={14} className="text-blue-500" />
                    <span className="text-[10px] font-black uppercase tracking-widest text-blue-500">Título do Post</span>
                </div>
                <input
                    type="text"
                    placeholder="Título memorável vai aqui..."
                    className="w-full text-5xl md:text-7xl font-black outline-none bg-transparent text-slate-900 dark:text-white placeholder:text-slate-100 dark:placeholder:text-slate-900 tracking-tighter leading-none transition-all focus:placeholder:opacity-0"
                    onChange={(e) => setTitle(e.target.value)}
                    autoFocus
                />
                <div className="absolute -bottom-4 left-0 w-24 h-2 bg-blue-600 rounded-full scale-x-0 group-focus-within:scale-x-100 transition-transform origin-left duration-500" />
            </div>

            {/* Componente Editor Envolto em Profundidade */}
            <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-b from-blue-500/5 to-transparent rounded-[3rem] -z-10 blur-2xl" />
                {/* AQUI ESTÁ A CORREÇÃO PRINCIPAL */}
                <Editor onContentChange={setContent} />
            </div>

            {/* Info de Rodapé do Form */}
            <div className="mt-8 flex justify-between items-center px-4">
                <div className="flex items-center gap-4">
                    <div className="flex flex-col">
                        <span className="text-[9px] font-black uppercase tracking-widest text-slate-400">Status</span>
                        <span className="text-[10px] font-bold text-slate-900 dark:text-slate-100 flex items-center gap-1">
                            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                            Modo Rascunho
                        </span>
                    </div>
                </div>
                <p className="text-[9px] font-black uppercase tracking-widest text-slate-300 dark:text-slate-700">
                    Auto-save desativado • Markdown Suportado
                </p>
            </div>
        </div>
    )
}