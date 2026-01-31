'use client'
import { motion, Variants } from 'framer-motion'

const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.05 }
    }
}

export const itemVariants: Variants = {
    hidden: { y: 30, opacity: 0, scale: 0.95 },
    visible: {
        y: 0, opacity: 1, scale: 1,
        transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
    }
}

export function AnimatedGrid({ children }: { children: React.ReactNode }) {
    return (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
            {children}
        </motion.div>
    )
}