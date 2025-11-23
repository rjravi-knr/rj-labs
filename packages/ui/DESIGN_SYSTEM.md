# Design System Standards

This document defines the core design tokens and standards for the RJ-Labs UI library.

## 1. Colors
We use a semantic color system powered by CSS variables and Tailwind CSS.

### Hierarchy
- **Primary**: The main brand color. Used for primary actions (buttons), active states, and key highlights.
- **Secondary**: Less prominent than primary. Used for secondary actions, badges, and accents.
- **Accent**: Used for subtle highlights, hover states, or decorative elements.
- **Destructive**: Used for destructive actions (delete, remove) and error states.
- **Muted**: Used for subdued text, backgrounds, and disabled states.
- **Background**: The underlying page background color.
- **Foreground**: The default text color.

### Functional Colors
- **Border**: Default border color for components.
- **Input**: Border color for form inputs.
- **Ring**: Focus ring color for accessibility.

## 2. Typography
We use a standard type scale and weight system.

### Font Family
- **Sans**: `Inter`, `system-ui`, `sans-serif` (Default)
- **Mono**: `ui-monospace`, `SFMono-Regular`, `monospace` (Code)

### Scale (Desktop)
- **h1**: 48px (3rem) - Page Titles
- **h2**: 30px (1.875rem) - Section Headings
- **h3**: 24px (1.5rem) - Subsection Headings
- **h4**: 20px (1.25rem) - Component Titles
- **p**: 16px (1rem) - Body Text
- **small**: 14px (0.875rem) - Metadata, Captions
- **tiny**: 12px (0.75rem) - Badges, Labels

### Weights
- **Regular**: 400
- **Medium**: 500
- **Semibold**: 600
- **Bold**: 700

## 3. Spacing
We follow Tailwind's 4px grid system.

- **0.5**: 2px
- **1**: 4px
- **2**: 8px
- **3**: 12px
- **4**: 16px (Base unit)
- **6**: 24px
- **8**: 32px
- **12**: 48px
- **16**: 64px

## 4. Radius
Standard border radius for consistency.

- **sm**: 2px (Small inputs, badges)
- **md**: 6px (Cards, Buttons) - *Default*
- **lg**: 8px (Modals, Large containers)
- **full**: 9999px (Avatars, Pills)

## 5. Breakpoints (Responsive)
We follow a **Mobile-First** approach. Styles are applied to mobile first, then overridden at larger breakpoints.

- **sm**: 640px (Tablets)
- **md**: 768px (Tablets Landscape / Small Laptops)
- **lg**: 1024px (Laptops)
- **xl**: 1280px (Desktops)
- **2xl**: 1536px (Large Screens)

> [!TIP]
> Always design for the smallest screen first, then use `md:`, `lg:` modifiers to adjust layout for larger screens.
