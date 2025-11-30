import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { BuilderState, ThemeConfig, PageMetadata } from '@/types/builder';

interface BuilderStore extends BuilderState {
  // Actions
  updateTheme: (theme: Partial<ThemeConfig>) => void;
  updateMetadata: (metadata: Partial<PageMetadata>) => void;
  setPreviewMode: (mode: boolean) => void;
  setSaving: (saving: boolean) => void;
  resetToDefaults: () => void;
}

const defaultTheme: ThemeConfig = {
  primaryColor: '#0ea5e9',
  secondaryColor: '#d946ef',
  fontFamily: 'Inter',
  backgroundColor: '#ffffff',
};

const defaultMetadata: PageMetadata = {
  title: 'My LMS Course Page',
  description: 'Build beautiful course landing pages with our AI-powered builder',
};

export const useBuilderStore = create<BuilderStore>()(
  persist(
    (set) => ({
      // Initial State
      theme: defaultTheme,
      metadata: defaultMetadata,
      previewMode: false,
      isSaving: false,

      // Actions
      updateTheme: (themeUpdate) =>
        set((state) => ({
          theme: { ...state.theme, ...themeUpdate },
        })),

      updateMetadata: (metadataUpdate) =>
        set((state) => ({
          metadata: { ...state.metadata, ...metadataUpdate },
        })),

      setPreviewMode: (mode) => set({ previewMode: mode }),

      setSaving: (saving) => set({ isSaving: saving }),

      resetToDefaults: () =>
        set({
          theme: defaultTheme,
          metadata: defaultMetadata,
          previewMode: false,
          isSaving: false,
        }),
    }),
    {
      name: 'builder-storage',
      partialize: (state) => ({
        theme: state.theme,
        metadata: state.metadata,
      }),
    }
  )
);
