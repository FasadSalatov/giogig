'use client'

import { motion } from 'framer-motion'
import { GradientCard } from './GradientCard'

interface IndexCardProps {
  title: string
  duration: string
  apy: string
  description: string
}

export const IndexCard = ({ title, duration, apy, description }: IndexCardProps) => {
  return (
    <GradientCard>
      <div className="p-6 space-y-4">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-xl font-bold text-[#F1DA8B]">{title}</h3>
            <p className="text-zinc-400 text-sm">{duration}</p>
          </div>
          <div className="text-right">
            <span className="text-2xl font-bold bg-gradient-to-r from-amber-400 to-yellow-500 bg-clip-text text-transparent">
              {apy}
            </span>
            <p className="text-zinc-400 text-sm">APY</p>
          </div>
        </div>
        <p className="text-zinc-400 text-sm">{description}</p>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full py-2 px-4 bg-gradient-to-r from-[#F1DA8B] to-yellow-500 rounded-lg font-medium"
        >
          Инвестировать
        </motion.button>
      </div>
    </GradientCard>
  )
}
