'use client';

import { useNode } from '@craftjs/core';
import { cn } from '@/lib/utils/cn';
import type { TextProps } from '@/types/builder';
import ContentEditable from 'react-contenteditable';

export const Text = ({
  content = 'Edit this text',
  fontSize = '16px',
  fontWeight = 'normal',
  color = '#000000',
  alignment = 'left',
  tag = 'p',
}: Partial<TextProps>) => {
  const {
    connectors: { connect, drag },
    actions: { setProp },
  } = useNode();

  const Tag = tag;

  return (
    <Tag
      ref={(ref: HTMLElement | null) => {
        if (ref) connect(drag(ref));
      }}
      className={cn('outline-none')}
      style={{
        fontSize,
        fontWeight,
        color,
        textAlign: alignment,
      }}
    >
      <ContentEditable
        html={content}
        onChange={(e) => setProp((props: TextProps) => (props.content = e.target.value))}
        tagName="span"
        className="outline-none"
      />
    </Tag>
  );
};

import { TextSettings } from './TextSettings';

Text.craft = {
  displayName: 'Text',
  props: {
    content: 'Edit this text',
    fontSize: '16px',
    fontWeight: 'normal',
    color: '#000000',
    alignment: 'left',
    tag: 'p',
  },
  related: {
    settings: TextSettings,
  },
};
