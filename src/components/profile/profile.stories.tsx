import type { Meta, StoryObj } from '@storybook/react-vite';
import { Profile } from './profile';

const meta: Meta<typeof Profile> = {
  title: 'Components/Profile',
  component: Profile,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Profile>;

export const Default: Story = {
  args: {
    username: 'johndoe',
    bio: 'Passionate developer who loves creating amazing user experiences. Always learning something new!',
    role: 'Creator',
  },
};

export const WithAvatar: Story = {
  args: {
    avatar: '/yuliaraitsyna.jpeg',
    username: 'johndoe',
    bio: 'Full-stack developer with 5+ years of experience in React, Node.js, and cloud technologies.',
    role: 'Expert',
  },
};

export const CurrentUser: Story = {
  args: {
    avatar: '/StanislauSenkevich.png',
    username: 'janedoe',
    bio: 'UX Designer passionate about creating intuitive and beautiful interfaces.',
    role: 'Creator',
  },
};

export const Minimal: Story = {
  args: {
    username: 'minimaluser',
    role: 'User',
  },
};
