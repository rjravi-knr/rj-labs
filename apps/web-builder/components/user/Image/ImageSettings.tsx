'use client';

import { useNode } from '@craftjs/core';
import type { ImageProps } from '@/types/builder';

export const ImageSettings = () => {
  const {
    actions: { setProp },
    props,
  } = useNode((node) => ({
    props: node.data.props as ImageProps,
  }));

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-2">Image URL</label>
        <input
          type="text"
          value={props.src}
          onChange={(e) => setProp((props: ImageProps) => (props.src = e.target.value))}
          className="w-full px-3 py-2 border rounded"
          placeholder="https://example.com/image.jpg"
        />
        <p className="text-xs text-gray-500 mt-1">Use Unsplash or any image URL</p>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Alt Text</label>
        <input
          type="text"
          value={props.alt}
          onChange={(e) => setProp((props: ImageProps) => (props.alt = e.target.value))}
          className="w-full px-3 py-2 border rounded"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Width</label>
        <input
          type="text"
          value={props.width}
          onChange={(e) => setProp((props: ImageProps) => (props.width = e.target.value))}
          className="w-full px-3 py-2 border rounded"
          placeholder="e.g., 100%, 500px"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Height</label>
        <input
          type="text"
          value={props.height}
          onChange={(e) => setProp((props: ImageProps) => (props.height = e.target.value))}
          className="w-full px-3 py-2 border rounded"
          placeholder="e.g., auto, 300px"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Object Fit</label>
        <select
          value={props.objectFit}
          onChange={(e) => setProp((props: ImageProps) => (props.objectFit = e.target.value as any))}
          className="w-full px-3 py-2 border rounded"
        >
          <option value="cover">Cover</option>
          <option value="contain">Contain</option>
          <option value="fill">Fill</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Border Radius</label>
        <input
          type="text"
          value={props.borderRadius}
          onChange={(e) => setProp((props: ImageProps) => (props.borderRadius = e.target.value))}
          className="w-full px-3 py-2 border rounded"
          placeholder="e.g., 0px, 8px, 50%"
        />
      </div>
    </div>
  );
};
