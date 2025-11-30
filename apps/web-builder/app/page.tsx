'use client';

import { Editor } from '@craftjs/core';
import { Toolbox } from '@/components/editor/Toolbox';
import { Viewport } from '@/components/editor/Viewport';
import { SettingsPanel } from '@/components/editor/SettingsPanel';
import { Toolbar } from '@/components/editor/Toolbar';
import { RenderNode } from '@/components/editor/RenderNode';
import { EditorInit } from '@/components/editor/EditorInit';

// Import all user components
import { Container } from '@/components/user/Container';
import { Text } from '@/components/user/Text';
import { Button } from '@/components/user/Button';
import { ImageComponent } from '@/components/user/Image';
import { Hero } from '@/components/user/Hero';
import { CourseCard } from '@/components/user/CourseCard';
import { FAQ } from '@/components/user/FAQ';
import { CopilotSidebar } from '@/components/ai/CopilotSidebar';
import { useEffect, useState } from 'react';

export default function BuilderPage() {
  const [isCopilotOpen, setIsCopilotOpen] = useState(false);

  // Load saved page on mount
  useEffect(() => {
    const savedPage = localStorage.getItem('builder-page');
    if (savedPage && window.location.search.includes('load=true')) {
      // Will be loaded by Editor onNodesChange
    }

    const handleToggle = () => setIsCopilotOpen(prev => !prev);
    document.addEventListener('toggle-copilot', handleToggle);
    return () => document.removeEventListener('toggle-copilot', handleToggle);
  }, []);

  return (
    <div className="h-screen flex flex-col">
      <Editor
        resolver={{
          Container,
          Text,
          Button,
          Image: ImageComponent,
          Hero,
          CourseCard,
          FAQ,
        }}
        onRender={RenderNode}

      >
        <EditorInit />
        <Toolbar />
        <div className="flex-1 flex overflow-hidden">
          {/* Left Panel - Toolbox */}
          <div className="w-64 flex-shrink-0">
            <Toolbox />
          </div>

          {/* Center Panel - Canvas */}
          <div className="flex-1">
            <Viewport />
          </div>

          {/* Right Panel - Settings */}
          <div className="w-80 flex-shrink-0">
            <SettingsPanel />
          </div>
        </div>
        
        <CopilotSidebar isOpen={isCopilotOpen} onClose={() => setIsCopilotOpen(false)} />
      </Editor>
    </div>
  );
}
