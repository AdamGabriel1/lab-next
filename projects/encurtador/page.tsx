'use client'
import { useState } from 'react'
import { QRCodeSVG } from 'qrcode.react'
import { createShortLink } from './actions'

export default function EncurtadorPage() {
    const [url, setUrl] = useState('')
    const [customCode, setCustomCode] = useState('')
    const [shortenedUrl, setShortenedUrl] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

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

    return (
        <main className="p-6 md:p-12 max-w-2xl mx-auto transition-colors">
            <div className="text-center mb-10">
                <h1 className="text-4xl font-black text-slate-900 dark:text-white mb-2 italic tracking-tighter">LINK.ZIP</h1>
                <p className="text-slate-500 dark:text-slate-400 font-medium">Encurte links e gere QR Codes em segundos.</p>
            </div>

            <form onSubmit={handleShorten} className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-xl flex flex-col gap-6 transition-colors">
                <div>
                    <label className="text-[10px] font-black uppercase text-slate-400 dark:text-slate-500 ml-2 tracking-widest">URL Original</label>
                    <input
                        required
                        type="url"
                        placeholder="https://exemplo.com/muito-longo"
                        className="w-full mt-1 p-4 rounded-2xl border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white outline-none focus:border-blue-500 dark:focus:border-blue-500 transition-all placeholder:text-slate-400 dark:placeholder:text-slate-600"
                        onChange={(e) => setUrl(e.target.value)}
                    />
                </div>

                <div>
                    <label className="text-[10px] font-black uppercase text-slate-400 dark:text-slate-500 ml-2 tracking-widest">Código Curto</label>
                    <div className="flex items-center mt-1 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-800 rounded-2xl px-4 focus-within:border-blue-500 transition-all">
                        <span className="text-slate-400 dark:text-slate-500 text-sm font-medium">zip.dev/</span>
                        <input
                            required
                            placeholder="promocao"
                            className="flex-1 p-4 bg-transparent outline-none text-sm font-bold text-blue-600 dark:text-blue-400"
                            onChange={(e) => setCustomCode(e.target.value)}
                        />
                    </div>
                </div>

                {error && <p className="text-red-500 text-xs font-bold text-center animate-pulse">{error}</p>}

                <button
                    disabled={loading}
                    className="bg-slate-900 dark:bg-blue-600 text-white font-black py-4 rounded-2xl hover:bg-blue-600 dark:hover:bg-blue-700 transition-all shadow-lg active:scale-95 disabled:opacity-50 uppercase tracking-widest text-xs"
                >
                    {loading ? 'ENCURTANDO...' : 'GERAR LINK CURTO'}
                </button>
            </form>

            {shortenedUrl && (
                <div className="mt-8 p-8 bg-blue-600 rounded-[2.5rem] text-white flex flex-col items-center gap-6 animate-in slide-in-from-bottom-4 duration-500 shadow-2xl shadow-blue-500/20">
                    <div className="text-center">
                        <p className="text-blue-100 text-[10px] font-black uppercase tracking-widest mb-2">Seu link encurtado</p>
                        <h3 className="text-xl font-black break-all">{shortenedUrl}</h3>
                    </div>

                    <div className="bg-white p-4 rounded-3xl shadow-2xl">
                        <QRCodeSVG value={shortenedUrl} size={160} />
                    </div>

                    <button
                        onClick={() => navigator.clipboard.writeText(shortenedUrl)}
                        className="bg-white/20 hover:bg-white/30 px-8 py-3 rounded-full text-[10px] font-black transition-all uppercase tracking-widest active:scale-95 border border-white/10"
                    >
                        COPIAR LINK
                    </button>
                </div>
            )}
        </main>
    )
}