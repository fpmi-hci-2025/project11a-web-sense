import type { Meta, StoryObj } from '@storybook/react-vite';

import { fn } from 'storybook/test';

import { Header } from './Header';

const meta = {
  title: 'Components/Header',
  component: Header,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  args: {
    onAvatarClick: fn(),
    onLogoClick: fn(),
  },
} satisfies Meta<typeof Header>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    avatarInitials: 'JD',
  },
};

export const WithAvatarImage: Story = {
  args: {
    avatarSrc: 'https://i.pravatar.cc/150?img=1',
    avatarAlt: 'User avatar',
  },
};

export const WithInitials: Story = {
  args: {
    avatarInitials: 'AB',
  },
};

export const PlaceholderAvatar: Story = {
  args: {},
};

export const Interactive: Story = {
  args: {
    avatarSrc: 'https://i.pravatar.cc/150?img=2',
    avatarAlt: 'User avatar',
    avatarInitials: 'JD',
    onAvatarClick: fn(),
    onLogoClick: fn(),
  },
};
