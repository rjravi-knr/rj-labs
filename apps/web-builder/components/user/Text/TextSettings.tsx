'use client';

import { useNode } from '@craftjs/core';
import type { TextProps } from '@/types/builder';

export const TextSettings = () => {
  const {
    actions: { setProp },
    props,
  } = useNode((node) => ({
    props: node.data.props as TextProps,
  }));

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-2">Tag</label>
        <select
          value={props.tag}
          onChange={(e) => setProp((props: TextProps) => (props.tag = e.target.value as any))}
          className="w-full px-3 py-2 border rounded"
        >
          <option value="h1">Heading 1</option>
          <option value="h2">Heading 2</option>
          <option value="h3">Heading 3</option>
          <option value="h4">Heading 4</option>
          <option value="h5">Heading 5</option>
          <option value="h6">Heading 6</option>
          <option value="p">Paragraph</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Font Size</label>
        <input
          type="text"
          value={props.fontSize}
          onChange={(e) => setProp((props: TextProps) => (props.fontSize = e.target.value))}
          className="w-full px-3 py-2 border rounded"
          placeholder="e.g., 16px, 1.5rem"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Font Weight</label>
        <select
          value={props.fontWeight}
          onChange={(e) => setProp((props: TextProps) => (props.fontWeight = e.target.value))}
          className="w-full px-3 py-2 border rounded"
        >
          <option value="normal">Normal</option>
          <option value="bold">Bold</option>
          <option value="lighter">Light</option>
          <option value="600">Semi-Bold</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Color</label>
        <input
          type="color"
          value={props.color}
          onChange={(e) => setProp((props: TextProps) => (props.color = e.target.value))}
          className="w-full h-10 rounded border"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Alignment</label>
        <div className="flex gap-2">
          {(['left', 'center', 'right'] as const).map((align) => (
            <button
              key={align}
              onClick={() => setProp((props: TextProps) => (props.alignment = align))}
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
