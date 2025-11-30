'use client';

import React from 'react';
import { useNode, useEditor } from '@craftjs/core';
import { Trash2, MoveVertical } from 'lucide-react';
import { cn } from '@/lib/utils/cn';

export const RenderNode = ({ render }: { render: React.ReactElement }) => {
  const {
    connectors: { connect, drag },
    id,
  } = useNode((node) => ({
    selected: node.events.selected,
    hovered: node.events.hovered,
  }));

  const {
    selected,
    hovered,
    actions: { delete: deleteNode },
    enabled,
  } = useEditor((state, query) => {
    const currentNode = id ? state.nodes[id] : undefined;
    return {
      selected: currentNode?.events?.selected || false,
      hovered: currentNode?.events?.hovered || false,
      enabled: state.options.enabled,
    };
  });

  return (
    <div
      ref={(ref) => {
        if (ref) connect(drag(ref));
      }}
      className={cn(
        'relative',
        selected && 'ring-2 ring-primary-500',
        hovered && !selected && 'ring-2 ring-primary-300'
      )}
    >
      {render}
      
      {enabled && (selected || hovered) && (
        <div className="absolute -top-6 left-0 bg-primary-600 text-white text-xs px-2 py-1 rounded-t flex items-center justify-between gap-2 z-10">
          <span className="font-medium">Component</span>
          <div className="flex items-center gap-1">
            <button
              className="p-1 hover:bg-primary-700 rounded"
              title="Move"
            >
              <MoveVertical className="w-3 h-3" />
            </button>
            <button
              className="p-1 hover:bg-red-600 rounded"
              title="Delete"
              onClick={(e) => {
                e.stopPropagation();
                if (id) deleteNode(id);
              }}
            >
              <Trash2 className="w-3 h-3" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
