import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';

import { Button } from './Button';

const meta = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],

  argTypes: {
    variant: {
      control: 'select',
      options: ['filled', 'text'],
    },
  },

  args: {
    onClick: fn(),
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Filled: Story = {
  args: {
    variant: 'filled',
    label: 'Filled Button',
  },
};

export const Text: Story = {
  args: {
    variant: 'text',
    label: 'Text Button',
  },
};

export const CustomLabel: Story = {
  args: {
    variant: 'filled',
    label: 'Custom Label',
  },
};
