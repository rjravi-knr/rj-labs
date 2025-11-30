'use client';

import { useNode } from '@craftjs/core';
import type { CourseCardProps } from '@/types/builder';

export const CourseCardSettings = () => {
  const {
    actions: { setProp },
    props,
  } = useNode((node) => ({
    props: node.data.props as CourseCardProps,
  }));

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-2">Course Title</label>
        <input
          type="text"
          value={props.title}
          onChange={(e) => setProp((props: CourseCardProps) => (props.title = e.target.value))}
          className="w-full px-3 py-2 border rounded"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Instructor</label>
        <input
          type="text"
          value={props.instructor}
          onChange={(e) => setProp((props: CourseCardProps) => (props.instructor = e.target.value))}
          className="w-full px-3 py-2 border rounded"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Description</label>
        <textarea
          value={props.description}
          onChange={(e) => setProp((props: CourseCardProps) => (props.description = e.target.value))}
          className="w-full px-3 py-2 border rounded"
          rows={3}
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Thumbnail URL</label>
        <input
          type="text"
          value={props.thumbnail}
          onChange={(e) => setProp((props: CourseCardProps) => (props.thumbnail = e.target.value))}
          className="w-full px-3 py-2 border rounded"
          placeholder="https://images.unsplash.com/..."
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Price ($)</label>
        <input
          type="number"
          value={props.price}
          onChange={(e) => setProp((props: CourseCardProps) => (props.price = parseFloat(e.target.value)))}
          className="w-full px-3 py-2 border rounded"
          step="0.01"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Rating (0-5)</label>
        <input
          type="number"
          value={props.rating}
          onChange={(e) => setProp((props: CourseCardProps) => (props.rating = parseFloat(e.target.value)))}
          className="w-full px-3 py-2 border rounded"
          min="0"
          max="5"
          step="0.1"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Level</label>
        <select
          value={props.level}
          onChange={(e) => setProp((props: CourseCardProps) => (props.level = e.target.value as any))}
          className="w-full px-3 py-2 border rounded"
        >
          <option value="Beginner">Beginner</option>
          <option value="Intermediate">Intermediate</option>
          <option value="Advanced">Advanced</option>
        </select>
      </div>
    </div>
  );
};
