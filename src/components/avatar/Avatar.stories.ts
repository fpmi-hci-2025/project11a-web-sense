import type { Meta, StoryObj } from '@storybook/react-vite';

import { fn } from 'storybook/test';

import { Avatar } from './Avatar';

const meta = {
  title: 'Components/Avatar',
  component: Avatar,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    onClick: fn(),
  },
} satisfies Meta<typeof Avatar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Placeholder: Story = {
  args: {
    size: 'medium',
  },
};

export const WithImage: Story = {
  args: {
    src: 'https://i.pravatar.cc/150?img=1',
    alt: 'User avatar',
    size: 'medium',
  },
};

export const Small: Story = {
  args: {
    alt: 'User avatar',
    size: 'small',
  },
};

export const Large: Story = {
  args: {
    alt: 'User avatar',
    size: 'large',
  },
};

export const WithInitials: Story = {
  args: {
    initials: 'JD',
    size: 'medium',
  },
};

export const Clickable: Story = {
  args: {
    alt: 'User avatar',
    size: 'medium',
    clickable: true,
    onClick: fn(),
  },
};
