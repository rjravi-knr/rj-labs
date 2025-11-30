'use client';

import { useNode } from '@craftjs/core';
import { cn } from '@/lib/utils/cn';
import { Star } from 'lucide-react';
import type { CourseCardProps } from '@/types/builder';

export const CourseCard = ({
  title = 'Web Development Masterclass',
  price = 99.99,
  thumbnail = 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800',
  instructor = 'John Doe',
  rating = 4.8,
  description = 'Learn modern web development from scratch',
  level = 'Beginner',
}: Partial<CourseCardProps>) => {
  const {
    connectors: { connect, drag },
  } = useNode();

  return (
    <div
      ref={(ref) => {
        if (ref) connect(drag(ref));
      }}
      className={cn(
        'bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow cursor-pointer max-w-sm'
      )}
    >
      <div className="relative h-48 overflow-hidden">
        <img src={thumbnail} alt={title} className="w-full h-full object-cover" />
        <span className="absolute top-2 right-2 bg-primary-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
          {level}
        </span>
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold mb-2 line-clamp-2">{title}</h3>
        <p className="text-gray-600 text-sm mb-3">{instructor}</p>
        <p className="text-gray-700 mb-4 line-clamp-2">{description}</p>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
            <span className="font-semibold">{rating}</span>
          </div>
          <span className="text-2xl font-bold text-primary-600">${price}</span>
        </div>
      </div>
    </div>
  );
};

import { CourseCardSettings } from './CourseCardSettings';

CourseCard.craft = {
  displayName: 'Course Card',
  props: {
    title: 'Complete Web Development Bootcamp',
    instructor: 'John Doe',
    description: 'Learn web development from scratch with this comprehensive course.',
    thumbnail: 'https://placehold.co/600x400',
    price: '$99.99',
    rating: 4.8,
    level: 'Beginner',
  },
  related: {
    settings: CourseCardSettings,
  },
};
