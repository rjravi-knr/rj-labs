'use client';

import { useNode } from '@craftjs/core';
import type { ContainerProps } from '@/types/builder';

export const ContainerSettings = () => {
  const {
    actions: { setProp },
    props,
  } = useNode((node) => ({
    props: node.data.props as ContainerProps,
  }));

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-2">Background Color</label>
        <input
          type="color"
          value={props.backgroundColor}
          onChange={(e) => setProp((props: ContainerProps) => (props.backgroundColor = e.target.value))}
          className="w-full h-10 rounded border"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Padding</label>
        <input
          type="text"
          value={props.padding}
          onChange={(e) => setProp((props: ContainerProps) => (props.padding = e.target.value))}
          className="w-full px-3 py-2 border rounded"
          placeholder="e.g., 2rem, 20px"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Max Width</label>
        <input
          type="text"
          value={props.maxWidth}
          onChange={(e) => setProp((props: ContainerProps) => (props.maxWidth = e.target.value))}
          className="w-full px-3 py-2 border rounded"
          placeholder="e.g., 1200px, 100%"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Layout</label>
        <select
          value={props.layout}
          onChange={(e) => setProp((props: ContainerProps) => (props.layout = e.target.value as any))}
          className="w-full px-3 py-2 border rounded"
        >
          <option value="vertical">Vertical</option>
          <option value="horizontal">Horizontal</option>
          <option value="grid">Grid</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Gap</label>
        <input
          type="text"
          value={props.gap}
          onChange={(e) => setProp((props: ContainerProps) => (props.gap = e.target.value))}
          className="w-full px-3 py-2 border rounded"
          placeholder="e.g., 1rem, 16px"
        />
      </div>
    </div>
  );
};
