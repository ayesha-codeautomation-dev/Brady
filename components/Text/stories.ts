import type { Meta, StoryObj } from '@storybook/react';
import Component from './';

const meta = {
  title: 'Elements/Text',
  component: Component,
  tags: ['autodocs']
} satisfies Meta<typeof Component>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    text: 'This is an example of a text component',
    as: 'p',
    size: 'md',
    variant: 'text'
  }
};
