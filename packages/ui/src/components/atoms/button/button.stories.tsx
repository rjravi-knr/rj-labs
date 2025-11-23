import { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from './button.js';

const meta = {
  title: 'Atoms/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: [
        'default',
        'secondary',
        'destructive',
        'ghost',
        'link',
        'outline',
      ],
    },
    size: {
      control: { type: 'select' },
      options: ['default', 'icon', 'sm', 'lg'],
    },
  },
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
The Button component is a versatile and accessible UI element for user actions. It supports multiple variants (default, secondary, destructive, ghost, link, outline) and sizes (default, small, large, icon).

**Usage:**

Import the component:

\`\`\`tsx
import { Button } from '@labs/ui/components/atoms/button/button';
\`\`\`

**Basic Example:**

\`\`\`tsx
<Button variant="default" size="default">Click me</Button>
\`\`\`

Use the controls or playground stories below to explore all variants and sizes.
        `,
      },
    },
  },
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

// Button Variants

// Default variant: all sizes (visual demo)
export const Default: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 12 }}>
      <Button variant="default" size="sm">Default Small</Button>
      <Button variant="default" size="default">Default Medium</Button>
      <Button variant="default" size="lg">Default Large</Button>
      <Button variant="default" size="icon" aria-label="star"><span role="img" aria-label="star">⭐</span></Button>
    </div>
  ),
  parameters: {
    controls: { hideNoControlsWarning: true, exclude: ['variant', 'size', 'children', 'disabled'] },
  },
};

// Default Playground (fully interactive)
export const DefaultPlayground: Story = {
  args: {
    variant: 'default',
    size: 'default',
    children: 'Default',
  },
};

// Secondary variant: all sizes (visual demo)
export const Secondary: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 12 }}>
      <Button variant="secondary" size="sm">Secondary Small</Button>
      <Button variant="secondary" size="default">Secondary Medium</Button>
      <Button variant="secondary" size="lg">Secondary Large</Button>
      <Button variant="secondary" size="icon" aria-label="star"><span role="img" aria-label="star">⭐</span></Button>
    </div>
  ),
  parameters: {
    controls: { hideNoControlsWarning: true, exclude: ['variant', 'size', 'children', 'disabled'] },
  },
};

// Secondary Playground (fully interactive)
export const SecondaryPlayground: Story = {
  args: {
    variant: 'secondary',
    size: 'default',
    children: 'Secondary',
  },
};

// Loading button (default variant)
export const Loading: Story = {
  args: {
    variant: 'default',
    size: 'default',
    children: 'Loading...',
    disabled: true,
  },
};

// Button with icon and text
export const WithIcon: Story = {
  args: {
    variant: 'default',
    size: 'default',
    children: <><span role="img" aria-label="star">⭐</span> With Icon</>,
  },
};

// All other variants, default size
export const Destructive: Story = {
  args: {
    variant: 'destructive',
    children: 'Destructive',
  },
};
export const Ghost: Story = {
  args: {
    variant: 'ghost',
    children: 'Ghost',
  },
};
export const Link: Story = {
  args: {
    variant: 'link',
    children: 'Link',
  },
};
export const Outline: Story = {
  args: {
    variant: 'outline',
    children: 'Outline',
  },
};
