import { ReactNode } from 'react';

interface BadgeProps {
  children: ReactNode;
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'danger';
  size?: 'sm' | 'md';
  className?: string;
}

export default function Badge({
  children,
  variant = 'default',
  size = 'md',
  className = ''
}: BadgeProps) {
  const variantStyles = {
    default: 'bg-[#16213e] text-gray-300',
    primary: 'bg-[#e94560]/20 text-[#e94560] border border-[#e94560]/30',
    success: 'bg-[#4ecca3]/20 text-[#4ecca3] border border-[#4ecca3]/30',
    warning: 'bg-yellow-500/20 text-yellow-500 border border-yellow-500/30',
    danger: 'bg-red-600/20 text-red-600 border border-red-600/30'
  };

  const sizeStyles = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-3 py-1 text-sm'
  };

  return (
    <span className={`inline-flex items-center rounded-full font-medium ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}>
      {children}
    </span>
  );
}
