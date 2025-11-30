'use client';

import { useEditor } from '@craftjs/core';
import { useEffect } from 'react';

export const EditorInit = () => {
  const { actions, query } = useEditor();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedPage = localStorage.getItem('builder-page');
      if (savedPage && !query.getSerializedNodes()) {
        try {
          actions.deserialize(savedPage);
        } catch (e) {
          console.error('Failed to load saved page:', e);
        }
      }
    }
  }, [actions, query]);

  return null;
};
