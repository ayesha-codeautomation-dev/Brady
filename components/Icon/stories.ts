import type { Meta, StoryObj } from '@storybook/react';
import Component from './';

const meta: Meta<typeof Component> = {
  title: 'Elements/Icon',
  component: Component,
  args: {
    color: 'primary',
    title: 'chevronRight',
    size: 'md'
  }
};

export default meta;

export const Default: StoryObj<typeof meta> = {};
