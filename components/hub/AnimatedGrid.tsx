'use client'
import { motion, Variants } from 'framer-motion'

// Configuração do container (Pai) com tipagem explícita
const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1
        }
    }
}

// Configuração de cada item (Filho) com tipagem explícita
export const itemVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
        y: 0,
        opacity: 1,
        transition: {
            duration: 0.5,
            ease: "easeOut" // Agora o TS aceita porque o objeto é do tipo Variants
        }
    }
}

export function AnimatedGrid({ children }: { children: React.ReactNode }) {
    return (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
        >
            {children}
        </motion.div>
    )
}