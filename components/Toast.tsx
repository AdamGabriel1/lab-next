'use client'
import { useState, useEffect } from 'react'
import { CheckCircle2, XCircle, Info, X } from 'lucide-react'

type ToastType = 'success' | 'error' | 'info'

interface ToastProps {
    message: string
    type: ToastType
    duration?: number
    onClose: () => void
}

export default function Toast({ message, type, duration = 3000, onClose }: ToastProps) {
    const [isVisible, setIsVisible] = useState(true)

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(false)
            setTimeout(onClose, 300)
        }, duration)

        return () => clearTimeout(timer)
    }, [duration, onClose])

    const icons = {
        success: <CheckCircle2 size={20} />,
        error: <XCircle size={20} />,
        info: <Info size={20} />
    }

    const colors = {
        success: 'bg-emerald-500 border-emerald-600',
        error: 'bg-red-500 border-red-600',
        info: 'bg-blue-500 border-blue-600'
    }

    return (
        <div className={`
            fixed bottom-8 right-8 z-[100] flex items-center gap-3
            ${colors[type]} text-white px-6 py-4 rounded-2xl shadow-2xl border-2
            transition-all duration-300
            ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}
        `}>
            {icons[type]}
            <span className="font-bold text-sm">{message}</span>
            <button
                onClick={() => {
                    setIsVisible(false)
                    setTimeout(onClose, 300)
                }}
                className="ml-2 hover:bg-white/20 p-1 rounded-lg transition-colors"
            >
                <X size={16} />
            </button>
        </div>
    )
}
