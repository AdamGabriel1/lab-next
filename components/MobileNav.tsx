// components/MobileNav.tsx
'use client'
import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'
import { usePathname } from 'next/navigation'

export default function MobileNav({ children }: { children: React.ReactNode }) {
    const [isOpen, setIsOpen] = useState(false)
    const pathname = usePathname()

    // Fecha a sidebar toda vez que o usuário muda de página
    useEffect(() => {
        setIsOpen(false)
    }, [pathname])

    return (
        <>
            {/* Botão Flutuante Superior (Sempre visível no mobile) */}
            <div className="md:hidden fixed top-0 left-0 w-full p-4 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 z-[60] flex justify-between items-center">
                <span className="font-black text-blue-600 dark:text-blue-400">LAB.NEXT</span>
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="p-2 bg-slate-900 dark:bg-blue-600 text-white rounded-xl shadow-lg"
                >
                    {isOpen ? <X size={20} /> : <Menu size={20} />}
                </button>
            </div>

            {/* Sidebar Lateral */}
            <aside className={`
                fixed left-0 top-0 h-screen w-72 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 z-[70] 
                transition-transform duration-500 cubic-bezier(0.4, 0, 0.2, 1)
                ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
            `}>
                {children}
            </aside>

            {/* Overlay Escuro */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm z-[65] md:hidden animate-in fade-in duration-300"
                    onClick={() => setIsOpen(false)}
                />
            )}

            {/* Espaçador para o Header Mobile não cobrir o conteúdo */}
            <div className="h-16 md:hidden" />
        </>
    )
}