'use client';

import React from 'react';
import { cn } from '@/src/utils/cn';

export interface AvatarProps {
  name: string;
  email?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const Avatar: React.FC<AvatarProps> = ({
  name,
  email,
  size = 'md',
  className,
}) => {
  const initials = name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  const sizeClasses = {
    sm: 'w-8 h-8 text-xs',
    md: 'w-10 h-10 text-sm',
    lg: 'w-12 h-12 text-base',
  };

  return (
    <div
      className={cn(
        'rounded-full bg-[#0f62fe] text-white flex items-center justify-center font-medium',
        sizeClasses[size],
        className
      )}
      aria-label={name}
      title={email || name}
    >
      {initials}
    </div>
  );
};


