'use client';

import { useNode, Element } from '@craftjs/core';
import { cn } from '@/lib/utils/cn';
import type { HeroProps } from '@/types/builder';
import { Text } from '../Text';
import { Button } from '../Button';

export const Hero = ({
  headline = 'Transform Your Future',
  subheadline = 'Learn from industry experts and achieve your goals',
  backgroundImage = 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1600',
  ctaText = 'Get Started',
  ctaLink = '#',
  alignment = 'center',
}: Partial<HeroProps>) => {
  const {
    connectors: { connect, drag },
  } = useNode();

  const alignmentClass =
    alignment === 'left' ? 'items-start text-left' : alignment === 'right' ? 'items-end text-right' : 'items-center text-center';

  return (
    <div
      ref={(ref) => {
        if (ref) connect(drag(ref));
      }}
      className={cn('relative w-full min-h-[500px] flex flex-col justify-center', alignmentClass)}
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="max-w-4xl mx-auto px-8 py-20 z-10">
        <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">{headline}</h1>
        <p className="text-xl md:text-2xl text-white/90 mb-8">{subheadline}</p>
        <div>
          <a
            href={ctaLink}
            className="inline-block bg-primary-600 hover:bg-primary-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors"
            onClick={(e) => e.preventDefault()}
          >
            {ctaText}
          </a>
        </div>
      </div>
    </div>
  );
};

import { HeroSettings } from './HeroSettings';

Hero.craft = {
  displayName: 'Hero',
  props: {
    headline: 'Welcome to our Course Platform',
    subheadline: 'Learn from the best instructors in the world',
    backgroundImage: 'https://placehold.co/1920x600',
    ctaText: 'Get Started',
    ctaLink: '#',
    alignment: 'center',
  },
  related: {
    settings: HeroSettings,
  },
};
