'use client';

import { useNode } from '@craftjs/core';
import type { HeroProps } from '@/types/builder';

export const HeroSettings = () => {
  const {
    actions: { setProp },
    props,
  } = useNode((node) => ({
    props: node.data.props as HeroProps,
  }));

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-2">Headline</label>
        <input
          type="text"
          value={props.headline}
          onChange={(e) => setProp((props: HeroProps) => (props.headline = e.target.value))}
          className="w-full px-3 py-2 border rounded"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Subheadline</label>
        <textarea
          value={props.subheadline}
          onChange={(e) => setProp((props: HeroProps) => (props.subheadline = e.target.value))}
          className="w-full px-3 py-2 border rounded"
          rows={3}
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Background Image URL</label>
        <input
          type="text"
          value={props.backgroundImage}
          onChange={(e) => setProp((props: HeroProps) => (props.backgroundImage = e.target.value))}
          className="w-full px-3 py-2 border rounded"
          placeholder="https://images.unsplash.com/..."
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">CTA Button Text</label>
        <input
          type="text"
          value={props.ctaText}
          onChange={(e) => setProp((props: HeroProps) => (props.ctaText = e.target.value))}
          className="w-full px-3 py-2 border rounded"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">CTA Link</label>
        <input
          type="text"
          value={props.ctaLink}
          onChange={(e) => setProp((props: HeroProps) => (props.ctaLink = e.target.value))}
          className="w-full px-3 py-2 border rounded"
          placeholder="#"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Text Alignment</label>
        <div className="flex gap-2">
          {(['left', 'center', 'right'] as const).map((align) => (
            <button
              key={align}
              onClick={() => setProp((props: HeroProps) => (props.alignment = align))}
              className={`px-3 py-2 border rounded capitalize ${props.alignment === align ? 'bg-primary-500 text-white' : ''}`}
            >
              {align}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
