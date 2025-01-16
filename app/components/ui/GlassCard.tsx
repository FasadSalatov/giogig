'use client';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
}

export function GlassCard({ children, className = '' }: GlassCardProps) {
  return (
    <div
      className={`relative backdrop-blur-xl bg-white/10 dark:bg-black/10 border border-white/20 dark:border-black/20 rounded-2xl ${className}`}
    >
      {children}
    </div>
  );
}
