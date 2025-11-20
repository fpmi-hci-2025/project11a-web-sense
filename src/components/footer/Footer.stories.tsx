import type { Meta, StoryObj } from '@storybook/react-vite';

import { Footer } from './Footer';

const meta = {
  title: 'Components/Footer',
  component: Footer,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof Footer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    copyright: '© 2025 Acme Inc. All rights reserved.',
    links: [
      { label: 'Privacy Policy', href: '#' },
      { label: 'Terms of Service', href: '#' },
      { label: 'Contact', href: '#' },
    ],
  },
};

export const WithChildren: Story = {
  args: {
    copyright: '© 2025 Acme Inc.',
  },
  render: (args) => <Footer {...args} />,
};

export const Minimal: Story = {
  args: {
    copyright: '© 2025 Acme Inc.',
  },
};
