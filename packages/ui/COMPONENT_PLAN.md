# UI Component Plan

This document outlines the planned components for the `@labs/ui` library, categorized by Atomic Design principles.

> [!NOTE]
> All components are powered by [shadcn/ui](https://ui.shadcn.com/) and styled with Tailwind CSS.

This document outlines the planned components for the `@labs/ui` library, categorized by Atomic Design principles and functional groups.

> [!NOTE]
> All components are powered by [shadcn/ui](https://ui.shadcn.com/) and styled with Tailwind CSS.

## 1. Atoms (Primitives)
The smallest, indivisible building blocks.

- [x] **Button**: Interactive button. `src/components/atoms/button`
- [x] **Code**: Inline code display. `src/components/atoms/code`
- [x] **Typography**: Headings, Paragraphs, Text styles. `src/components/atoms/typography`
- [ ] **Icon**: SVG icon wrapper (Lucide React).
- [x] **Badge**: Small status indicator. `src/components/atoms/badge`
- [x] **Avatar**: User profile image/fallback. `src/components/atoms/avatar`
- [x] **Skeleton**: Loading placeholder states. `src/components/atoms/skeleton`
- [x] **Separator**: Visual divider. `src/components/atoms/separator`
- [x] **Spinner**: Loading indicator. `src/components/atoms/spinner`
- [x] **Toggle**: Two-state button. `src/components/atoms/toggle`
- [ ] **Kbd**: Keyboard shortcut display.
- [ ] **Item**: Generic list/menu item wrapper.

## 2. Molecules (Composites)
Simple combinations of atoms.

- [x] **Card**: Container with header, content, and footer. `src/components/molecules/card`
- [x] **Alert**: Status message with icon. `src/components/molecules/alert`
- [x] **Accordion**: Collapsible content sections. `src/components/molecules/accordion`
- [x] **Collapsible**: Simple expand/collapse. `src/components/molecules/collapsible`
- [ ] **Tooltip**: Hover information.
- [ ] **Popover**: Click-triggered overlay content.
- [ ] **HoverCard**: Preview content on hover.
- [ ] **ButtonGroup**: Group of buttons.

## 3. Forms (Input & Control)
Components for user data entry.

- [x] **Input**: Text input fields. `src/components/forms/input`
- [ ] **Textarea**: Multi-line text input.
- [x] **Checkbox**: Binary choice. `src/components/forms/checkbox`
- [ ] **RadioGroup**: Single choice from list.
- [ ] **Switch**: Toggle switch.
- [ ] **Select**: Dropdown selection.
- [ ] **NativeSelect**: Native browser dropdown.
- [ ] **Slider**: Range selection.
- [ ] **Form**: Wrapper for form validation and layout (React Hook Form).
- [ ] **Field**: Generic form field wrapper.
- [ ] **Label**: Accessible field labels.
- [ ] **Combobox**: Searchable dropdown.
- [ ] **DatePicker**: Date selection input.
- [ ] **InputOTP**: One-time password input.
- [ ] **InputGroup**: Group of related inputs.
- [ ] **ToggleGroup**: Group of two-state buttons.

## 4. Navigation (Wayfinding)
Components to help users move through the app.

- [ ] **Tabs**: Tabbed interface.
- [x] **Breadcrumb**: Path navigation. `src/components/navigation/breadcrumb`
- [ ] **Pagination**: Page navigation.
- [ ] **DropdownMenu**: Menu actions.
- [ ] **Menubar**: Desktop-style menu bar.
- [ ] **NavigationMenu**: Complex site navigation.
- [x] **Command**: Command palette. `src/components/navigation/command`
- [x] **ContextMenu**: Right-click menu. `src/components/navigation/context-menu`
- [ ] **Sidebar**: Application sidebar.
- [ ] **Drawer**: Mobile-friendly side overlay.

## 5. Feedback & Overlays
Components for user interaction feedback and modal content.

- [x] **Dialog (Modal)**: Critical interaction overlay. `src/components/feedback/dialog`
- [ ] **Sheet**: Side-anchored overlay (Sidebar/Drawer).
- [ ] **Toast**: Temporary notification.
- [ ] **Sonner**: Stackable toast notifications.
- [ ] **Progress**: Progress bar.
- [x] **AlertDialog**: Critical confirmation dialog. `src/components/feedback/alert-dialog`

## 6. Data Display
Components for presenting data.

- [ ] **Table**: Basic data table.
- [ ] **DataTable**: Advanced table with sorting/filtering (TanStack Table).
- [ ] **ScrollArea**: Custom scrollable container.
- [x] **AspectRatio**: Image/Content aspect ratio container. `src/components/data-display/aspect-ratio`
- [x] **Calendar**: Date picker/display. `src/components/data-display/calendar`
- [x] **Carousel**: Image/Content carousel. `src/components/data-display/carousel`
- [ ] **Chart**: Data visualization charts.
- [ ] **Empty**: Empty state display.

## 7. Layouts (Structure)
Structural components for page and section layout.

- [ ] **Container**: Centered max-width wrapper.
- [ ] **Grid**: CSS Grid wrapper.
- [ ] **Flex**: Flexbox wrapper.
- [ ] **Stack**: Vertical/Horizontal stack with spacing.
- [ ] **Resizable**: Resizable panel layouts.

## 8. Proposed Additions (Ease of Development)
High-utility components not in standard shadcn/ui but highly recommended.

- [ ] **FileUpload**: Drag & drop file upload zone.
- [ ] **MultiSelect**: Dropdown with multiple selection support.
- [ ] **DateRangePicker**: Date range selection input.
- [ ] **ColorPicker**: Color selection input.
- [ ] **Timeline**: Vertical list of events.
- [ ] **Tree**: Hierarchical data display.
- [ ] **VirtualList**: Efficient rendering for large lists.
