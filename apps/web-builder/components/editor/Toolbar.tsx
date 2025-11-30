'use client';

import { useEditor } from '@craftjs/core';
import { useBuilderStore } from '@/store/useBuilderStore';
import { Save, Undo, Redo, Eye, Download, Loader2, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils/cn';

export const Toolbar = () => {
  const { isSaving, setSaving } = useBuilderStore();
  const { actions, query, canUndo, canRedo } = useEditor((state, query) => ({
    enabled: state.options.enabled,
    canUndo: query.history.canUndo(),
    canRedo: query.history.canRedo(),
  }));

  const handleSave = () => {
    setSaving(true);
    const json = query.serialize();
    localStorage.setItem('builder-page', json);
    console.log('Page saved:', json);
    
    // Simulate save delay
    setTimeout(() => {
      setSaving(false);
    }, 500);
  };

  const handleExport = () => {
    const json = query.serialize();
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'page-export.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  const handlePreview = () => {
    const json = query.serialize();
    localStorage.setItem('builder-preview', json);
    window.open('/preview', '_blank');
  };

  return (
    <div className="h-16 bg-white border-b flex items-center justify-between px-6">
      <div className="flex items-center gap-4">
        <h1 className="text-xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
          LMS Builder
        </h1>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={() => actions.history.undo()}
          disabled={!canUndo}
          className={cn(
            'p-2 rounded hover:bg-gray-100 transition-colors',
            !canUndo && 'opacity-50 cursor-not-allowed'
          )}
          title="Undo"
        >
          <Undo className="w-5 h-5" />
        </button>
        <button
          onClick={() => actions.history.redo()}
          disabled={!canRedo}
          className={cn(
            'p-2 rounded hover:bg-gray-100 transition-colors',
            !canRedo && 'opacity-50 cursor-not-allowed'
          )}
          title="Redo"
        >
          <Redo className="w-5 h-5" />
        </button>
        
        <div className="w-px h-6 bg-gray-300 mx-2" />

        <button
          onClick={() => document.dispatchEvent(new CustomEvent('toggle-copilot'))}
          className="flex items-center gap-2 px-3 py-2 text-primary-600 bg-primary-50 border border-primary-200 rounded hover:bg-primary-100 transition-colors"
        >
          <Sparkles className="w-4 h-4" />
          <span className="text-sm font-medium">Copilot</span>
        </button>

        <button
          onClick={handleSave}
          disabled={isSaving}
          className="flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded hover:bg-primary-700 transition-colors disabled:opacity-50"
        >
          {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          Save
        </button>

        <button
          onClick={handlePreview}
          className="flex items-center gap-2 px-4 py-2 border rounded hover:bg-gray-50 transition-colors"
        >
          <Eye className="w-4 h-4" />
          Preview
        </button>

        <button
          onClick={handleExport}
          className="flex items-center gap-2 px-4 py-2 border rounded hover:bg-gray-50 transition-colors"
        >
          <Download className="w-4 h-4" />
          Export
        </button>
      </div>
    </div>
  );
};
