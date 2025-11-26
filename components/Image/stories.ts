import type { Meta, StoryObj } from '@storybook/react';
import dummyImage from '@/assets/images/dummyImage.jpg';
import Component from './';

const meta: Meta<typeof Component> = {
  title: 'Elements/Image',
  component: Component,
  args: {
    width: dummyImage?.width,
    height: dummyImage?.height,
    src: dummyImage?.src,
    alt: 'This is an image',
    quality: 80,
    aspectRatio: 'auto',
    placeholder: 'empty',
    priority: false,
    sizes: '100vw'
  }
} satisfies Meta<typeof Component>;

export default meta;

export const Default: StoryObj<typeof meta> = {
  args: {
    width: dummyImage?.width,
    height: dummyImage?.height,
    src: dummyImage?.src,
    altText: 'This is an image',
    sizes: '100vw'
  }
};
