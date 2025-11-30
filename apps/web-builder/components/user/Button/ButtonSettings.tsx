'use client';

import { useNode } from '@craftjs/core';
import type { ButtonProps } from '@/types/builder';

export const ButtonSettings = () => {
  const {
    actions: { setProp },
    props,
  } = useNode((node) => ({
    props: node.data.props as ButtonProps,
  }));

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-2">Button Text</label>
        <input
          type="text"
          value={props.text}
          onChange={(e) => setProp((props: ButtonProps) => (props.text = e.target.value))}
          className="w-full px-3 py-2 border rounded"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Link URL</label>
        <input
          type="text"
          value={props.link}
          onChange={(e) => setProp((props: ButtonProps) => (props.link = e.target.value))}
          className="w-full px-3 py-2 border rounded"
          placeholder="https://example.com"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Variant</label>
        <select
          value={props.variant}
          onChange={(e) => setProp((props: ButtonProps) => (props.variant = e.target.value as any))}
          className="w-full px-3 py-2 border rounded"
        >
          <option value="primary">Primary</option>
          <option value="secondary">Secondary</option>
          <option value="outline">Outline</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Size</label>
        <select
          value={props.size}
          onChange={(e) => setProp((props: ButtonProps) => (props.size = e.target.value as any))}
          className="w-full px-3 py-2 border rounded"
        >
          <option value="sm">Small</option>
          <option value="md">Medium</option>
          <option value="lg">Large</option>
        </select>
      </div>
    </div>
  );
};
