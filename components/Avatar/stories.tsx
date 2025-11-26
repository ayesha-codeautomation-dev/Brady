import type { Meta, StoryObj } from '@storybook/react';
import dummyAvatar from '@/assets/images/dummyAvatar.jpg';
import Component from './';

const meta: Meta<typeof Component> = {
  title: 'Elements/Avatar',
  component: Component,
  tags: ['autodocs'],
  args: {
    name: 'Wolly Mammoth',
    size: 'md',
    color: 'primary',
    image: {
      width: dummyAvatar.width,
      height: dummyAvatar.height,
      src: dummyAvatar.src,
      alt: 'Wolly Mammoth'
    },
    showImage: true
  }
};

export default meta;

export const Default: StoryObj<typeof meta> = {};
