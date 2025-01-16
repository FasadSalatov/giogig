'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { Button } from './Button'
import { FiArrowRight } from 'react-icons/fi'

interface FeatureBlockProps {
  title: string
  description: string
  features: string[]
  image: string
  color: string
  reverse?: boolean
  action?: {
    text: string
    href: string
  }
}

export const FeatureBlock = ({
  title,
  description,
  features,
  image,
  color,
  reverse = false,
  action
}: FeatureBlockProps) => {
  return (
    <div className={`grid md:grid-cols-2 gap-12 md:gap-16 items-center ${reverse ? 'md:grid-flow-dense' : ''}`}>
      <motion.div
        initial={{ opacity: 0, x: reverse ? 20 : -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        className="space-y-8"
      >
        <h2 className={`text-4xl font-bold bg-gradient-to-r ${color} bg-clip-text text-transparent`}>
          {title}
        </h2>
        <p className="text-lg text-zinc-400">
          {description}
        </p>
        <ul className="space-y-4">
          {features.map((feature, index) => (
            <motion.li
              key={index}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center space-x-3"
            >
              <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${color}`} />
              <span className="text-zinc-300">{feature}</span>
            </motion.li>
          ))}
        </ul>
        {action && (
          <Button
            className={`bg-gradient-to-r ${color} hover:brightness-110`}
          >
            <span className="flex items-center">
              {action.text}
              <FiArrowRight className="ml-2" />
            </span>
          </Button>
        )}
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, x: reverse ? -20 : 20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        className="relative"
      >
        <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
          <div className={`absolute inset-0 bg-gradient-to-br ${color} opacity-10`} />
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover"
          />
        </div>
        <div className="absolute -inset-px rounded-2xl bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity blur-xl" />
      </motion.div>
    </div>
  )
}
