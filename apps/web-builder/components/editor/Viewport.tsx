'use client';

import { useEditor, Frame, Element } from '@craftjs/core';
import { Container } from '../user/Container';
import { cn } from '@/lib/utils/cn';

export const Viewport = () => {
  const { enabled } = useEditor((state) => ({
    enabled: state.options.enabled,
  }));

  return (
    <div className="h-full bg-gray-100 overflow-auto">
      <div className="min-h-full p-8">
        <div className={cn('bg-white shadow-lg mx-auto', 'max-w-6xl min-h-[800px]')}>
          <Frame>
            <Element
              is={Container}
              canvas
              backgroundColor="#ffffff"
              padding="0"
              maxWidth="100%"
              layout="vertical"
              gap="0"
            >
              <div className="min-h-[400px] flex items-center justify-center text-gray-400">
                <div className="text-center">
                  <p className="text-lg font-medium mb-2">Drop components here</p>
                  <p className="text-sm">Drag components from the toolbox to start building</p>
                </div>
              </div>
            </Element>
          </Frame>
        </div>
      </div>
    </div>
  );
};
