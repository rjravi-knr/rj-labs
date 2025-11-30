'use client';

import { useNode } from '@craftjs/core';
import { cn } from '@/lib/utils/cn';
import type { ContainerProps } from '@/types/builder';

import { forwardRef } from 'react';

export const Container = forwardRef<HTMLDivElement, Partial<ContainerProps> & { children?: React.ReactNode }>(({
  backgroundColor = '#ffffff',
  padding = '2rem',
  maxWidth = '1200px',
  layout = 'vertical',
  gap = '1rem',
  children,
}, ref) => {
  const {
    connectors: { connect, drag },
  } = useNode();

  const layoutClass =
    layout === 'horizontal'
      ? 'flex flex-row'
      : layout === 'grid'
        ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
        : 'flex flex-col';

  return (
    <div
      ref={(domRef) => {
        if (domRef) {
          connect(drag(domRef));
          if (typeof ref === 'function') ref(domRef);
          else if (ref) ref.current = domRef;
        }
      }}
      className={cn('w-full mx-auto', layoutClass)}
      style={{
        backgroundColor,
        padding,
        maxWidth,
        gap,
      }}
    >
      {children}
    </div>
  );
});

import { ContainerSettings } from './ContainerSettings';

(Container as any).craft = {
  displayName: 'Container',
  props: {
    backgroundColor: '#ffffff',
    padding: '2rem',
    maxWidth: '1200px',
    layout: 'vertical',
    gap: '1rem',
  },
  rules: {
    canDrag: () => true,
    canDrop: () => true,
    canMoveIn: () => true,
    canMoveOut: () => true,
  },
  related: {
    settings: ContainerSettings,
  },
};
