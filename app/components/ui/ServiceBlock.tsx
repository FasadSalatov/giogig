'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { ReactNode } from 'react'

interface ServiceBlockProps {
  title: string
  description: string
  icon: string
  children: ReactNode
  glowColors?: {
    primary: string
    secondary?: string
  }
}

export const ServiceBlock = ({
  title,
  description,
  icon,
  children,
  glowColors = {
    primary: 'rgb(3, 115, 218)',
    secondary: 'rgb(30, 207, 165)'
  }
}: ServiceBlockProps) => {
  return (
    <motion.li
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      className="sticky top-[114px] bg-white rounded-[64px] p-10 h-[632px] flex flex-col gap-4 shadow-[rgba(110,110,110,0.09)_0_-9px_9px_0]"
    >
      <div className="flex justify-between items-center">
        <h3 className="text-[2.75rem] leading-[48.4px] font-normal">
          {title}
        </h3>
        <Image 
          src={icon} 
          alt=""
          width={64}
          height={64}
          className="transition-transform hover:scale-110"
        />
      </div>

      <div className="flex flex-col gap-6">
        <p className="text-[1.5rem] leading-[31.2px] w-[54%] font-normal text-zinc-600">
          {description}
        </p>

        <div className="bg-[#1C1C1C] rounded-3xl h-[386px] w-full relative flex items-center justify-center overflow-hidden">
          {/* Glow Effects */}
          <div
            className="absolute w-[100px] h-[100px] blur-[100px] z-0"
            style={{
              background: glowColors.primary,
              right: '-20px',
              top: '-20px'
            }}
          />
          {glowColors.secondary && (
            <div
              className="absolute w-[100px] h-[100px] blur-[100px] z-0"
              style={{
                background: glowColors.secondary,
                left: '-20px',
                bottom: '-20px'
              }}
            />
          )}

          {/* Content */}
          <div className="relative z-[1]">
            {children}
          </div>

          {/* Noise Overlay */}
          <div className="absolute inset-0 opacity-[0.02]">
            <Image
              src="/noise.webp"
              alt=""
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </motion.li>
  )
}
