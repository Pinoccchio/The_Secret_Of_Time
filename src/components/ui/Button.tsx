'use client';

import { motion } from 'framer-motion';
import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  className?: string;
  glow?: boolean;
}

export function Button({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  disabled = false,
  className = '',
  glow = true,
}: ButtonProps) {
  const baseClasses = `
    relative font-display font-semibold
    transition-all duration-300
    disabled:opacity-50 disabled:cursor-not-allowed
    overflow-hidden
  `;

  const variantClasses = {
    primary: `
      bg-gradient-to-r from-gold to-sunset
      text-background
      hover:from-sunset hover:to-gold
      shadow-lg hover:shadow-2xl
      ${glow ? 'mystical-glow' : ''}
    `,
    secondary: `
      bg-purple/20 border-2 border-purple
      text-foreground
      hover:bg-purple/40
      hover:border-gold
    `,
    ghost: `
      bg-transparent border-2 border-foreground/30
      text-foreground
      hover:border-gold hover:text-gold
    `,
  };

  const sizeClasses = {
    sm: 'px-4 py-2 text-sm rounded-md',
    md: 'px-6 py-3 text-base rounded-lg',
    lg: 'px-8 py-4 text-lg rounded-xl',
  };

  return (
    <motion.button
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      whileHover={{ scale: disabled ? 1 : 1.05 }}
      whileTap={{ scale: disabled ? 1 : 0.95 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Shimmer effect overlay */}
      {!disabled && (
        <span className="absolute inset-0 shimmer-effect pointer-events-none" />
      )}

      {/* Content */}
      <span className="relative z-10">{children}</span>
    </motion.button>
  );
}
