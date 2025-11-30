'use client';

import { useEditor, Element } from '@craftjs/core';
import { Container } from '../user/Container';
import { Text } from '../user/Text';
import { Button } from '../user/Button';
import { ImageComponent } from '../user/Image';
import { Hero } from '../user/Hero';
import { CourseCard } from '../user/CourseCard';
import { FAQ } from '../user/FAQ';
import { cn } from '@/lib/utils/cn';
import { Blocks, Type, Square, Image, Sparkles, GraduationCap, HelpCircle } from 'lucide-react';

const components = [
  {
    category: 'Layout',
    items: [
      {
        name: 'Container',
        icon: Square,
        component: Container,
        description: 'Flexible container with layout options',
      },
    ],
  },
  {
    category: 'Basic',
    items: [
      {
        name: 'Text',
        icon: Type,
        component: Text,
        description: 'Editable text block',
      },
      {
        name: 'Button',
        icon: Sparkles,
        component: Button,
        description: 'Call-to-action button',
      },
      {
        name: 'Image',
        icon: Image,
        component: ImageComponent,
        description: 'Responsive image',
      },
    ],
  },
  {
    category: 'LMS Components',
    items: [
      {
        name: 'Hero',
        icon: Blocks,
        component: Hero,
        description: 'Hero section with CTA',
      },
      {
        name: 'Course Card',
        icon: GraduationCap,
        component: CourseCard,
        description: 'Course display card',
      },
      {
        name: 'FAQ',
        icon: HelpCircle,
        component: FAQ,
        description: 'FAQ accordion',
      },
    ],
  },
];

export const Toolbox = () => {
  const { connectors } = useEditor();

  return (
    <div className="h-full bg-white border-r overflow-y-auto">
      <div className="p-4 border-b">
        <h2 className="text-lg font-bold">Components</h2>
        <p className="text-sm text-gray-500">Drag to add to canvas</p>
      </div>

      <div className="p-4 space-y-6">
        {components.map((category) => (
          <div key={category.category}>
            <h3 className="text-xs font-semibold text-gray-500 uppercase mb-3">{category.category}</h3>
            <div className="space-y-2">
              {category.items.map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.name}
                    ref={(ref) => {
                      if (ref) {
                        connectors.create(
                          ref,
                          <Element is={item.component} canvas={item.component === Container} />
                        );
                      }
                    }}
                    className={cn(
                      'p-3 border rounded-lg cursor-move hover:border-primary-500 hover:bg-primary-50 transition-colors'
                    )}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <Icon className="w-5 h-5 text-primary-600" />
                      <span className="font-medium text-sm">{item.name}</span>
                    </div>
                    <p className="text-xs text-gray-500">{item.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
