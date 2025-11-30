'use client';

import { useNode } from '@craftjs/core';
import { cn } from '@/lib/utils/cn';
import type { ButtonProps } from '@/types/builder';

export const Button = ({
  text = 'Click Me',
  link = '#',
  variant = 'primary',
  size = 'md',
}: Partial<ButtonProps>) => {
  const {
    connectors: { connect, drag },
  } = useNode();

  const variantClasses = {
    primary: 'bg-primary-600 hover:bg-primary-700 text-white',
    secondary: 'bg-secondary-600 hover:bg-secondary-700 text-white',
    outline: 'border-2 border-primary-600 text-primary-600 hover:bg-primary-50',
  };

  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };

  return (
    <a
      ref={(ref) => {
        if (ref) connect(drag(ref));
      }}
      href={link}
      className={cn(
        'inline-block rounded-lg font-semibold transition-colors cursor-pointer',
        variantClasses[variant],
        sizeClasses[size]
      )}
      onClick={(e) => e.preventDefault()}
    >
      {text}
    </a>
  );
};

import { ButtonSettings } from './ButtonSettings';

Button.craft = {
  displayName: 'Button',
  props: {
    text: 'Click me',
    link: '#',
    variant: 'primary',
    size: 'md',
  },
  related: {
    settings: ButtonSettings,
  },
};
