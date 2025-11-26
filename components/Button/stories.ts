import type { Meta, StoryObj } from '@storybook/react';
import Component from './';

const meta = {
  title: 'Elements/Button',
  component: Component,
  tags: ['autodocs'],
  args: {
    text: 'Button',
    variant: 'pill',
    theme: 'primary',
    outline: false,
    disabled: false,
    onClick: () => console.log('Button clicked')
  }
} satisfies Meta<typeof Component>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    text: 'Button',
    variant: 'pill',
    theme: 'primary',
    outline: false,
    disabled: false
  }
};
