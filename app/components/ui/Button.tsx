'use client';

import { ButtonHTMLAttributes, forwardRef } from 'react';
import { cn } from '@/app/lib/utils';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'outline' | 'ghost';
  size?: 'default' | 'sm' | 'lg';
  asChild?: boolean;
  children: React.ReactNode;
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({
    className,
    variant = 'default',
    size = 'default',
    asChild,
    disabled,
    loading,
    fullWidth,
    children,
    ...props
  }, ref) => {
    const Comp = asChild ? 'span' : 'button';

    const baseClasses = 'inline-flex items-center justify-center rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none';
    const sizeClasses = {
      default: 'h-9 px-4 py-2',
      sm: 'h-8 px-3 text-sm',
      lg: 'h-10 px-8'
    };
    const variantClasses = {
      default: 'bg-white/10 hover:bg-white/20 text-white',
      outline: 'border border-white/10 hover:bg-white/5 text-white',
      ghost: 'hover:bg-white/10 text-white'
    };

    return (
      <Comp
        className={cn(
          baseClasses,
          sizeClasses[size],
          variantClasses[variant],
          fullWidth && 'w-full',
          (disabled || loading) && 'opacity-50 cursor-not-allowed',
          className
        )}
        disabled={disabled || loading}
        ref={ref}
        {...props}
      >
        {loading ? (
          <span className="inline-block w-4 h-4 border-2 border-current border-r-transparent rounded-full animate-spin mr-2" />
        ) : null}
        {children}
      </Comp>
    );
  }
);

Button.displayName = 'Button';

export { Button };
