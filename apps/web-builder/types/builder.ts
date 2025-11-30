export type ComponentType =
  | 'Container'
  | 'Text'
  | 'Button'
  | 'Image'
  | 'Hero'
  | 'CourseCard'
  | 'FAQ';

export interface HeroProps {
  headline: string;
  subheadline: string;
  backgroundImage: string;
  ctaText: string;
  ctaLink: string;
  alignment: 'left' | 'center' | 'right';
}

export interface CourseCardProps {
  title: string;
  price: number;
  thumbnail: string;
  instructor: string;
  rating: number;
  description: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
}

export interface ContainerProps {
  backgroundColor: string;
  padding: string;
  maxWidth: string;
  layout: 'vertical' | 'horizontal' | 'grid';
  gap: string;
}

export interface TextProps {
  content: string;
  fontSize: string;
  fontWeight: string;
  color: string;
  alignment: 'left' | 'center' | 'right';
  tag: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p';
}

export interface ButtonProps {
  text: string;
  link: string;
  variant: 'primary' | 'secondary' | 'outline';
  size: 'sm' | 'md' | 'lg';
}

export interface ImageProps {
  src: string;
  alt: string;
  width: string;
  height: string;
  objectFit: 'cover' | 'contain' | 'fill';
  borderRadius: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface FAQProps {
  items: FAQItem[];
  accentColor: string;
}

export interface ThemeConfig {
  primaryColor: string;
  secondaryColor: string;
  fontFamily: string;
  backgroundColor: string;
}

export interface PageMetadata {
  title: string;
  description: string;
  favicon?: string;
}

export interface BuilderState {
  theme: ThemeConfig;
  metadata: PageMetadata;
  previewMode: boolean;
  isSaving: boolean;
}
