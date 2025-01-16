'use client';

import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}

export function Card({ children, className, onClick }: CardProps) {
  return (
    <div className={cn("rounded-xl border h-hull", className)} onClick={onClick}>
      {children}
    </div>
  );
}
