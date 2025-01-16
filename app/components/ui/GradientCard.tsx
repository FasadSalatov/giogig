'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface GradientCardProps {
  className?: string
  children: React.ReactNode
  hover?: boolean
}

export const GradientCard = ({ className, children, hover = true }: GradientCardProps) => {
  return (
    <div className="relative group">
      <div className="absolute -inset-0.5 bg-gradient-to-r from-[#F1DA8B] to-yellow-500 rounded-2xl blur opacity-30 group-hover:opacity-50 transition duration-1000"></div>
      <motion.div
        whileHover={hover ? { scale: 1.02 } : {}}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className={cn(
          "relative bg-black rounded-2xl",
          className
        )}
      >
        {children}
      </motion.div>
    </div>
  )
}
