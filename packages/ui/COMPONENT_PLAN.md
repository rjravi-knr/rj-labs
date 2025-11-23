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
- [x] **Tooltip**: Hover information. `src/components/molecules/tooltip`
- [x] **Popover**: Click-triggered overlay content. `src/components/molecules/popover`
- [x] **HoverCard**: Preview content on hover. `src/components/molecules/hover-card`
- [x] **ButtonGroup**: Group of buttons. `src/components/molecules/button-group`

## 3. Forms (Input & Control)
Components for user data entry.

- [x] **Input**: Text input fields. `src/components/forms/input`
- [x] **Textarea**: Multi-line text input. `src/components/forms/textarea`
- [x] **Checkbox**: Binary choice. `src/components/forms/checkbox`
- [x] **RadioGroup**: Single choice from list. `src/components/forms/radio-group`
- [x] **Switch**: Toggle switch. `src/components/forms/switch`
- [x] **Select**: Dropdown selection. `src/components/forms/select`
- [ ] **NativeSelect**: Native browser dropdown.
- [x] **Slider**: Range selection. `src/components/forms/slider`
- [x] **Form**: Wrapper for form validation and layout (React Hook Form). `src/components/forms/form`
- [ ] **Field**: Generic form field wrapper.
- [x] **Label**: Accessible field labels. `src/components/forms/label`
- [x] **Combobox**: Searchable dropdown. `src/components/forms/combobox`
- [x] **DatePicker**: Date selection input. `src/components/forms/date-picker`
- [x] **InputOTP**: One-time password input. `src/components/forms/input-otp`
- [ ] **InputGroup**: Group of related inputs.
- [x] **ToggleGroup**: Group of two-state buttons. `src/components/forms/toggle-group`

## 4. Navigation (Wayfinding)
Components to help users move through the app.

- [x] **Tabs**: Tabbed interface. `src/components/navigation/tabs`
- [x] **Breadcrumb**: Path navigation. `src/components/navigation/breadcrumb`
- [x] **Pagination**: Page navigation. `src/components/navigation/pagination`
- [x] **DropdownMenu**: Menu actions. `src/components/navigation/dropdown-menu`
- [x] **Menubar**: Desktop-style menu bar. `src/components/navigation/menubar`
- [x] **NavigationMenu**: Complex site navigation. `src/components/navigation/navigation-menu`
- [x] **Command**: Command palette. `src/components/navigation/command`
- [x] **ContextMenu**: Right-click menu. `src/components/navigation/context-menu`
- [ ] **Sidebar**: Application sidebar.
- [x] **Drawer**: Mobile-friendly side overlay. `src/components/navigation/drawer`

## 5. Feedback & Overlays
Components for user interaction feedback and modal content.

- [x] **Dialog (Modal)**: Critical interaction overlay. `src/components/feedback/dialog`
- [x] **Sheet**: Side-anchored overlay (Sidebar/Drawer). `src/components/feedback/sheet`
- [ ] **Toast**: Temporary notification.
- [x] **Sonner**: Stackable toast notifications. `src/components/feedback/sonner`
- [x] **Progress**: Progress bar. `src/components/feedback/progress`
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
