'use client';

import { useEffect, useState } from 'react';
import { Editor, Frame } from '@craftjs/core';
import { Container } from '@/components/user/Container';
import { Text } from '@/components/user/Text';
import { Button } from '@/components/user/Button';
import { ImageComponent } from '@/components/user/Image';
import { Hero } from '@/components/user/Hero';
import { CourseCard } from '@/components/user/CourseCard';
import { FAQ } from '@/components/user/FAQ';
import { Loader2 } from 'lucide-react';

export default function PreviewPage() {
  const [pageData, setPageData] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load from localStorage
    const data = localStorage.getItem('builder-preview') || localStorage.getItem('builder-page');
    setPageData(data);
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary-600" />
      </div>
    );
  }

  if (!pageData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2">No Preview Available</h1>
          <p className="text-gray-600">Create a page in the builder first</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
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
        enabled={false} // View-only mode
      >
        <Frame data={pageData}>
          <Container />
        </Frame>
      </Editor>
    </div>
  );
}
