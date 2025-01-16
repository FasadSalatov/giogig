'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface TabButtonProps {
  active: boolean
  onClick: () => void
  children: React.ReactNode
  className?: string
}

export const TabButton = ({ active, onClick, children, className }: TabButtonProps) => {
  return (
    <motion.button
      onClick={onClick}
      className={cn(
        'relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200',
        active ? 'text-[#F1DA8B]' : 'text-zinc-400 hover:text-zinc-200',
        className
      )}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {children}
      {active && (
        <motion.div
          layoutId="activeTab"
          className="absolute inset-0 bg-gradient-to-r from-[#F1DA8B]/20 to-yellow-500/20 rounded-lg -z-10"
          initial={false}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        />
      )}
    </motion.button>
  )
}
