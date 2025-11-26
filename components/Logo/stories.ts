import type { Meta, StoryObj } from '@storybook/react';
import Component from './';

const meta: Meta<typeof Component> = {
  title: 'Elements/Logo',
  component: Component,
  tags: ['autodocs'],
  args: {
    size: 'md',
    color: 'primary'
  }
};

export default meta;

export const Default: StoryObj<typeof meta> = {
  args: {
    size: 'md',
    color: 'primary'
  }
};
