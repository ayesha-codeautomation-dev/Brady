import type { Meta, StoryObj } from '@storybook/react';
import dummyImage from '@/assets/images/dummyImage.jpg';
import Component from './';

const meta: Meta<typeof Component> = {
  title: 'Elements/Image Animated',
  component: Component,
  args: {
    yMotion: 20,
    width: dummyImage?.width,
    height: dummyImage?.height,
    src: dummyImage?.src,
    alt: 'This is an image',
    quality: 80,
    ratio: 'auto',
    placeholder: 'empty',
    priority: false
  }
};

export default meta;

export const Default: StoryObj<typeof meta> = {
  args: {
    width: dummyImage?.width,
    height: dummyImage?.height,
    src: dummyImage?.src,
    alt: 'This is an image'
  }
};
