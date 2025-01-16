'use client';

interface GradientBorderProps {
  children: React.ReactNode;
  className?: string;
  isAnimated?: boolean;
}

export function GradientBorder({
  children,
  className = '',
  isAnimated = true,
}: GradientBorderProps) {
  return (
    <div className={`relative group  ${className}`}>
      <div
        className={`absolute inset-0 rounded-2xl bg-gradient-to-r from-[#AB28E7] via-[#E7B728] to-[#AB28E7] ${isAnimated ? 'group-hover:animate-gradient-xy' : ''
          } opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
      />
      <div className="absolute inset-[1px] rounded-2xl bg-white dark:bg-black" />
      <div className="relative h-full">{children}</div>
    </div>
  );
}
