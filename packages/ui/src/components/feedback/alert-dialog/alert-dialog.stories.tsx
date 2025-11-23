
import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
} from './alert-dialog.js';

const meta: Meta<typeof AlertDialog> = {
  title: 'Feedback/AlertDialog',
  component: AlertDialog,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: [
          'The **AlertDialog** component displays a modal dialog that interrupts the user with important content and expects a response.',
          '',
          '**Import:**',
          '```tsx',
          "import { AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogHeader, AlertDialogFooter, AlertDialogTitle, AlertDialogDescription, AlertDialogAction, AlertDialogCancel } from '@labs/ui/components/feedback/alert-dialog/alert-dialog';",
          '```',
          '',
          'Use the examples below to see how to use the AlertDialog component.'
        ].join('\n'),
      },
    },
  },
};
export default meta;

type Story = StoryObj<typeof AlertDialog>;

export const Basic: Story = {
  render: () => (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <button style={{ padding: '0.5rem 1rem', borderRadius: 4, border: '1px solid #ccc', background: '#fff', cursor: 'pointer' }}>
          Open Dialog
        </button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your item and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  ),
  parameters: {
    docs: {
      description: {
        story: 'A basic alert dialog with title, description, and actions.'
      }
    }
  }
};

export const Destructive: Story = {
  render: () => (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <button style={{ padding: '0.5rem 1rem', borderRadius: 4, border: '1px solid #e11d48', background: '#fff', color: '#e11d48', cursor: 'pointer' }}>
          Delete Item
        </button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete this item?</AlertDialogTitle>
          <AlertDialogDescription>
            This action is <b>irreversible</b>. Are you sure you want to delete this item?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction style={{ background: '#e11d48', color: '#fff' }}>Delete</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  ),
  parameters: {
    docs: {
      description: {
        story: 'A destructive alert dialog for confirming dangerous actions.'
      }
    }
  }
};

export const CustomContent: Story = {
  render: () => (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <button style={{ padding: '0.5rem 1rem', borderRadius: 4, border: '1px solid #6366f1', background: '#6366f1', color: '#fff', cursor: 'pointer' }}>
          Show Info
        </button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Heads up!</AlertDialogTitle>
          <AlertDialogDescription>
            <ul>
              <li>This dialog can contain custom React nodes.</li>
              <li>Lists, images, and more are supported.</li>
            </ul>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Close</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  ),
  parameters: {
    docs: {
      description: {
        story: 'An alert dialog with custom content, such as lists or images.'
      }
    }
  }
};

export const OneAction: Story = {
  render: () => (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <button style={{ padding: '0.5rem 1rem', borderRadius: 4, border: '1px solid #10b981', background: '#10b981', color: '#fff', cursor: 'pointer' }}>
          Proceed
        </button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Proceed with operation?</AlertDialogTitle>
          <AlertDialogDescription>
            This dialog only has a single action button.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction>OK</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  ),
  parameters: {
    docs: {
      description: {
        story: 'An alert dialog with only one action button.'
      }
    }
  }
};