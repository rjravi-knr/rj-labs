'use client';

import React from 'react';
import { useEditor } from '@craftjs/core';
import { useBuilderStore } from '@/store/useBuilderStore';

export const SettingsPanel = () => {
  const { theme, metadata, updateTheme, updateMetadata } = useBuilderStore();
  const { selected, actions } = useEditor((state, query) => {
    const currentNodeId = query.getEvent('selected').last();
    let selected;

    if (currentNodeId) {
      selected = {
        id: currentNodeId,
        name: state.nodes[currentNodeId]?.data.displayName,
        settings: state.nodes[currentNodeId]?.related?.settings,
      };
    }

    return { selected };
  });

  return (
    <div className="h-full bg-white border-l overflow-y-auto">
      <div className="p-4 border-b">
        <h2 className="text-lg font-bold">Settings</h2>
        {selected && <p className="text-sm text-gray-500">{selected.name}</p>}
      </div>

      <div className="p-4">
        {selected?.settings ? (
          // Render component-specific settings
          (() => {
            console.log('Rendering settings for:', selected.name, selected.settings);
            return React.createElement(selected.settings);
          })()
        ) : (
          // Show page-level settings when nothing is selected
          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-semibold mb-3">Page Settings</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Page Title</label>
                  <input
                    type="text"
                    value={metadata.title}
                    onChange={(e) => updateMetadata({ title: e.target.value })}
                    className="w-full px-3 py-2 border rounded"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Description</label>
                  <textarea
                    value={metadata.description}
                    onChange={(e) => updateMetadata({ description: e.target.value })}
                    className="w-full px-3 py-2 border rounded"
                    rows={3}
                  />
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold mb-3">Theme</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Primary Color</label>
                  <input
                    type="color"
                    value={theme.primaryColor}
                    onChange={(e) => updateTheme({ primaryColor: e.target.value })}
                    className="w-full h-10 rounded border"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Secondary Color</label>
                  <input
                    type="color"
                    value={theme.secondaryColor}
                    onChange={(e) => updateTheme({ secondaryColor: e.target.value })}
                    className="w-full h-10 rounded border"
                  />
                </div>
              </div>
            </div>

            <div className="text-sm text-gray-500 p-3 bg-gray-50 rounded">
              💡 Select a component on the canvas to edit its properties
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
