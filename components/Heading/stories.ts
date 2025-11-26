import type { Meta, StoryObj } from '@storybook/react';
import Component from './';

const meta = {
  title: 'Elements/Heading',
  component: Component,
  tags: ['autodocs'],
  args: {
    title: 'This is a title',
    subtitle: 'This is a subtitle',
    tagline: 'This is a tagline',
    variant: 'section',
    theme: 'primary'
  }
} satisfies Meta<typeof Component>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'This is a title',
    subtitle: 'This is a subtitle',
    tagline: 'This is a tagline',
    variant: 'section',
    theme: 'primary'
  }
};
