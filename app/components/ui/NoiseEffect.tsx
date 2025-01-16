'use client'

import { useEffect, useRef } from 'react'

export const NoiseEffect = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let frame = 0
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const createNoise = () => {
      const imageData = ctx.createImageData(canvas.width, canvas.height)
      const data = imageData.data

      for (let i = 0; i < data.length; i += 4) {
        const noise = Math.random() * 255
        data[i] = noise
        data[i + 1] = noise
        data[i + 2] = noise
        data[i + 3] = 15 // Opacity
      }

      ctx.putImageData(imageData, 0, 0)
    }

    const animate = () => {
      frame = requestAnimationFrame(animate)
      createNoise()
    }

    animate()

    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    window.addEventListener('resize', handleResize)

    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none opacity-[0.015] mix-blend-overlay"
      style={{ zIndex: 1 }}
    />
  )
}
