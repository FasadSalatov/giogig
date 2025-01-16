'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { GradientCard } from './GradientCard'

interface GameCardProps {
  title: string
  description: string
  image: string
  reward: string
}

export const GameCard = ({ title, description, image, reward }: GameCardProps) => {
  return (
    <GradientCard>
      <div className="relative overflow-hidden rounded-2xl">
        <div className="relative h-48 w-full">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent" />
        </div>
        <div className="absolute inset-0 p-6 flex flex-col justify-end">
          <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
          <p className="text-zinc-300 text-sm mb-4">{description}</p>
          <div className="flex justify-between items-center">
            <span className="text-[#F1DA8B] font-medium">Награда: {reward}</span>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-4 py-2 bg-gradient-to-r from-[#F1DA8B] to-yellow-500 rounded-lg font-medium text-sm"
            >
              Играть
            </motion.button>
          </div>
        </div>
      </div>
    </GradientCard>
  )
}
