import { ReactNode } from 'react'
import { motion } from 'framer-motion'

interface GlowCardProps {
  children: ReactNode
  className?: string
  glowColor?: string
  noiseOpacity?: number
}

export const GlowCard = ({
  children,
  className = '',
  glowColor = 'rgba(255, 180, 0, 0.2)',
  noiseOpacity = 0.4
}: GlowCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={`relative bg-zinc-900/50 backdrop-blur-xl rounded-3xl ${className}`}
    >
      {/* Glow Effect */}
      <div
        className="absolute inset-0 rounded-3xl opacity-40 blur-2xl transition-opacity group-hover:opacity-60"
        style={{ background: glowColor }}
      />

      {/* Noise Texture */}
      <div 
        className="absolute inset-0 rounded-3xl"
        style={{
          backgroundImage: 'url(/noise.png)',
          opacity: noiseOpacity,
          mixBlendMode: 'overlay'
        }}
      />

      {/* Content */}
      <div className="relative">
        {children}
      </div>
    </motion.div>
  )
}
