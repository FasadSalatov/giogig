"use client";

import { motion } from "framer-motion";

export const HeroBackground = () => {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden">
      {/* Большой элипс справа */}
      <motion.div
        className="absolute -right-[30%] top-[10%] w-[800px] h-[800px]"
        style={{
          background: "radial-gradient(circle at center, rgba(59,130,246,0.15) 0%, rgba(59,130,246,0) 70%)",
          filter: "blur(60px)",
        }}
        animate={{
          scale: [1, 1.2, 1],
          x: [0, -30, 0],
          y: [0, 50, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      {/* Средний элипс слева */}
      <motion.div
        className="absolute -left-[20%] top-[30%] w-[600px] h-[600px]"
        style={{
          background: "radial-gradient(circle at center, rgba(139,92,246,0.15) 0%, rgba(139,92,246,0) 70%)",
          filter: "blur(60px)",
        }}
        animate={{
          scale: [1, 1.3, 1],
          x: [0, 40, 0],
          y: [0, -30, 0],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      {/* Маленький элипс в центре */}
      <motion.div
        className="absolute left-[40%] top-[20%] w-[300px] h-[300px]"
        style={{
          background: "radial-gradient(circle at center, rgba(59,130,246,0.1) 0%, rgba(139,92,246,0.1) 50%, transparent 70%)",
          filter: "blur(40px)",
        }}
        animate={{
          scale: [1, 1.5, 1],
          x: [0, 30, 0],
          y: [0, 30, 0],
          rotate: [0, 180, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      {/* Мерцающие точки */}
      {Array.from({ length: 30 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full"
          style={{
            background: "linear-gradient(to right, #3b82f6, #8b5cf6)",
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            opacity: [0, 0.8, 0],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
        />
      ))}

      {/* Тонкая сетка */}
      <div 
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
          opacity: 0.2,
        }}
      />
    </div>
  );
};
