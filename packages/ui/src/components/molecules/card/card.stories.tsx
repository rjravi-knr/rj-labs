import { Meta, StoryObj } from "@storybook/react-vite";
import {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardAction,
  CardDescription,
  CardContent,
} from "./card.js";

const meta = {
  title: "Molecules/Card",
  component: Card,
  tags: ["autodocs"],
  argTypes: {},
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
The Card component is a flexible container for grouping related content and actions. It supports headers, footers, actions, images, and custom content.

**Usage:**

Import the component:

\`\`\`tsx
import { Card, CardHeader, CardFooter, CardTitle, CardAction, CardDescription, CardContent } from '@labs/ui/components/molecules/card/card';
\`\`\`

**Basic Example:**

\`\`\`tsx
<Card>
  <CardHeader>
    <CardTitle>Title</CardTitle>
    <CardDescription>Description</CardDescription>
  </CardHeader>
  <CardContent>Content</CardContent>
  <CardFooter>Footer</CardFooter>
</Card>
\`\`\`

See the stories below for more advanced usage and variants.
        `,
      },
    },
  },
} satisfies Meta<typeof Card>;

export default meta;

type Story = StoryObj<typeof meta>;

// Default Card
export const Default: Story = {
  args: {
    children: (
      <>
        <CardHeader>
          <CardTitle>Card Title</CardTitle>
          <CardDescription>Card Description</CardDescription>
        </CardHeader>
        <CardContent>
          <p>This is the card content.</p>
        </CardContent>
        <CardFooter>
          <p>Card Footer</p>
        </CardFooter>
      </>
    ),
  },
};

// Card with Image
export const WithImage: Story = {
  args: {
    children: (
      <>
        <CardHeader>
          <CardTitle>Card with Image</CardTitle>
          <CardDescription>This card includes an image at the top.</CardDescription>
        </CardHeader>
        <img
          src="https://placehold.co/600x200"
          alt="Example"
          style={{ width: "100%", borderRadius: "0.75rem 0.75rem 0 0" }}
        />
        <CardContent>
          <p>
            Here is some content below the image. You can use this layout to display media-rich cards.
          </p>
        </CardContent>
        <CardFooter>
          <button>Learn More</button>
        </CardFooter>
      </>
    ),
  },
};

// Card with Action Button
export const WithAction: Story = {
  args: {
    children: (
      <>
        <CardHeader>
          <CardTitle>Card with Action</CardTitle>
          <CardDescription>Card with a header action button.</CardDescription>
          <CardAction>
            <button>Action</button>
          </CardAction>
        </CardHeader>
        <CardContent>
          <p>This card has an action button in the header.</p>
        </CardContent>
        <CardFooter>
          <p>Footer</p>
        </CardFooter>
      </>
    ),
  },
};

// Card with Footer Only
export const WithFooterOnly: Story = {
  args: {
    children: (
      <>
        <CardContent>
          <p>Minimal card with only footer.</p>
        </CardContent>
        <CardFooter>
          <button>Footer Action</button>
        </CardFooter>
      </>
    ),
  },
};