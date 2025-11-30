'use client';

import { useNode } from '@craftjs/core';
import { Plus, Trash2 } from 'lucide-react';
import type { FAQProps, FAQItem } from '@/types/builder';

export const FAQSettings = () => {
  const {
    actions: { setProp },
    props,
  } = useNode((node) => ({
    props: node.data.props as FAQProps,
  }));

  const addItem = () => {
    setProp((props: FAQProps) => {
      props.items.push({ question: 'New Question', answer: 'New Answer' });
    });
  };

  const removeItem = (index: number) => {
    setProp((props: FAQProps) => {
      props.items.splice(index, 1);
    });
  };

  const updateItem = (index: number, field: keyof FAQItem, value: string) => {
    setProp((props: FAQProps) => {
      if (props.items && props.items[index]) {
        props.items[index][field] = value;
      }
    });
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-2">Accent Color</label>
        <input
          type="color"
          value={props.accentColor}
          onChange={(e) => setProp((props: FAQProps) => (props.accentColor = e.target.value))}
          className="w-full h-10 rounded border"
        />
      </div>

      <div>
        <div className="flex items-center justify-between mb-3">
          <label className="block text-sm font-medium">FAQ Items</label>
          <button
            onClick={addItem}
            className="flex items-center gap-1 px-3 py-1 bg-primary-600 text-white rounded text-sm hover:bg-primary-700"
          >
            <Plus className="w-4 h-4" />
            Add
          </button>
        </div>
        <div className="space-y-3 max-h-96 overflow-y-auto">
          {props.items.map((item, index) => (
            <div key={index} className="border rounded p-3 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Item {index + 1}</span>
                <button
                  onClick={() => removeItem(index)}
                  className="text-red-600 hover:text-red-700"
                  title="Remove item"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
              <input
                type="text"
                value={item.question}
                onChange={(e) => updateItem(index, 'question', e.target.value)}
                className="w-full px-2 py-1 border rounded text-sm"
                placeholder="Question"
              />
              <textarea
                value={item.answer}
                onChange={(e) => updateItem(index, 'answer', e.target.value)}
                className="w-full px-2 py-1 border rounded text-sm"
                rows={2}
                placeholder="Answer"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
