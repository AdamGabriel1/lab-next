'use client'
import { useState } from 'react'
import { QRCodeSVG } from 'qrcode.react'
import { createShortLink } from './actions'
import { Link2, Zap, Copy, Check, Info, Share2 } from 'lucide-react'

export default function EncurtadorPage() {
    const [url, setUrl] = useState('')
    const [customCode, setCustomCode] = useState('')
    const [shortenedUrl, setShortenedUrl] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const [copied, setCopied] = useState(false)

    const handleShorten = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError('')

        const res = await createShortLink(url, customCode)

        if (res.error) {
            setError(res.error)
            setShortenedUrl('')
        } else {
            setShortenedUrl(`${window.location.origin}/${res.code}`)
        }
        setLoading(false)
    }

    const copyToClipboard = () => {
        navigator.clipboard.writeText(shortenedUrl)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    return (
        <main className="p-4 md:p-20 max-w-3xl mx-auto min-h-screen bg-transparent">
            {/* Header Estilizado */}
            <div className="text-center mb-12 space-y-3">
                <div className="inline-flex items-center gap-2 bg-blue-500/10 text-blue-600 dark:text-blue-400 px-4 py-1.5 rounded-full border border-blue-500/20 shadow-sm">
                    <Zap size={14} className="fill-current animate-pulse" />
                    <span className="text-[10px] font-black uppercase tracking-[0.2em]">Next-Gen Link Shortener</span>
                </div>
                <h1 className="text-6xl font-black text-slate-900 dark:text-white italic tracking-tighter uppercase leading-none">
                    ZIP<span className="text-blue-600">.</span>DEV
                </h1>
                <p className="text-slate-500 dark:text-slate-400 font-medium italic">Encurte a distância entre o seu conteúdo e o seu público.</p>
            </div>

            {/* Formulário Principal */}
            <form onSubmit={handleShorten} className="bg-white dark:bg-slate-900 p-10 rounded-[3rem] border border-slate-200 dark:border-slate-800 shadow-2xl relative overflow-hidden transition-all duration-500">
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/5 blur-3xl -z-0" />

                <div className="relative z-10 space-y-8">
                    {/* Input URL */}
                    <div className="group">
                        <label className="flex items-center gap-2 text-[11px] font-black uppercase text-slate-400 dark:text-slate-500 ml-2 mb-2 tracking-widest transition-colors group-focus-within:text-blue-500">
                            <Link2 size={12} /> URL Original
                        </label>
                        <input
                            required
                            type="url"
                            placeholder="https://sua-url-longa.com/com-muitos-parametros"
                            className="w-full p-5 rounded-2xl border-2 border-slate-50 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/50 text-slate-900 dark:text-white outline-none focus:border-blue-500 dark:focus:border-blue-500 transition-all font-medium text-sm placeholder:text-slate-400 dark:placeholder:text-slate-600"
                            onChange={(e) => setUrl(e.target.value)}
                        />
                    </div>

                    {/* Input Código */}
                    <div className="group">
                        <label className="flex items-center gap-2 text-[11px] font-black uppercase text-slate-400 dark:text-slate-500 ml-2 mb-2 tracking-widest transition-colors group-focus-within:text-blue-500">
                            <Share2 size={12} /> Custom Code
                        </label>
                        <div className="flex items-center bg-slate-50/50 dark:bg-slate-800/50 border-2 border-slate-50 dark:border-slate-800 rounded-2xl px-6 focus-within:border-blue-500 transition-all">
                            <span className="text-slate-400 dark:text-slate-500 text-sm font-black italic tracking-tighter">zip.dev/</span>
                            <input
                                required
                                placeholder="alias-personalizado"
                                className="flex-1 p-5 bg-transparent outline-none text-sm font-black text-blue-600 dark:text-blue-400 placeholder:font-medium uppercase"
                                onChange={(e) => setCustomCode(e.target.value)}
                            />
                        </div>
                    </div>

                    {error && (
                        <div className="bg-red-500/10 border border-red-500/20 p-4 rounded-xl flex items-center gap-3">
                            <Info size={16} className="text-red-500" />
                            <p className="text-red-500 text-xs font-bold uppercase tracking-tight">{error}</p>
                        </div>
                    )}

                    <button
                        disabled={loading}
                        className="w-full bg-slate-900 dark:bg-blue-600 text-white font-black py-5 rounded-[1.5rem] hover:bg-blue-600 dark:hover:bg-blue-700 transition-all shadow-xl shadow-blue-500/20 active:scale-95 disabled:opacity-50 uppercase tracking-[0.2em] text-xs flex items-center justify-center gap-2"
                    >
                        {loading ? 'Sincronizando...' : 'Gerar Link ZIP'}
                    </button>
                </div>
            </form>

            {/* Resultado do Encurtamento */}
            {shortenedUrl && (
                <div className="mt-12 p-10 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-[3.5rem] text-white flex flex-col items-center gap-8 animate-in zoom-in-95 duration-700 shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 pointer-events-none" />

                    <div className="text-center relative z-10">
                        <p className="text-blue-100 text-[10px] font-black uppercase tracking-[0.3em] mb-3 opacity-80">Link Pronto para Uso</p>
                        <h3 className="text-2xl font-black break-all tracking-tighter bg-white/10 px-6 py-2 rounded-2xl border border-white/10 backdrop-blur-sm">
                            {shortenedUrl}
                        </h3>
                    </div>

                    <div className="bg-white p-6 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.3)] rotate-1 hover:rotate-0 transition-transform duration-500">
                        <QRCodeSVG value={shortenedUrl} size={180} />
                    </div>

                    <button
                        onClick={copyToClipboard}
                        className="bg-white text-blue-600 hover:bg-blue-50 px-12 py-4 rounded-full text-[11px] font-black transition-all uppercase tracking-[0.2em] active:scale-95 shadow-xl flex items-center gap-3"
                    >
                        {copied ? <Check size={14} /> : <Copy size={14} />}
                        {copied ? 'COPIADO!' : 'COPIAR LINK'}
                    </button>
                </div>
            )}
        </main>
    )
}