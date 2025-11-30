'use client';

import { useNode } from '@craftjs/core';
import { cn } from '@/lib/utils/cn';
import type { ImageProps } from '@/types/builder';
import Image from 'next/image';

export const ImageComponent = ({
  src = 'https://images.unsplash.com/photo-1516496636080-14fb876e029d?w=800',
  alt = 'Image',
  width = '100%',
  height = 'auto',
  objectFit = 'cover',
  borderRadius = '0px',
}: Partial<ImageProps>) => {
  const {
    connectors: { connect, drag },
  } = useNode();

  return (
    <div
      ref={(ref) => {
        if (ref) connect(drag(ref));
      }}
      className={cn('relative overflow-hidden')}
      style={{
        width,
        height: height === 'auto' ? 'auto' : height,
        minHeight: height === 'auto' ? '200px' : undefined,
        borderRadius,
      }}
    >
      <img
        src={src}
        alt={alt}
        className="w-full h-full"
        style={{
          objectFit,
        }}
      />
    </div>
  );
};

import { ImageSettings } from './ImageSettings';

ImageComponent.craft = {
  displayName: 'Image',
  props: {
    src: 'https://placehold.co/600x400',
    alt: 'Placeholder image',
    width: '100%',
    height: 'auto',
    objectFit: 'cover',
    borderRadius: '0px',
  },
  related: {
    settings: ImageSettings,
  },
};
