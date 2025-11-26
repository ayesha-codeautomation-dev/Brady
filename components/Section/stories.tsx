import type { Meta, StoryObj } from '@storybook/react';
import Text from '@/components/Text';
import Component from './';

const meta: Meta<typeof Component> = {
  title: 'View/Section',
  component: Component,
  tags: ['autodocs'],
  args: {
    as: 'section',
    color: 'primary',
    spacing: 'sm',
    full: false
  }
};

export default meta;

const Template = (args: typeof Component) => (
  <Component {...args}>
    <Text as="h1" text="Section" />
    <Text as="p" text="Section content" />
  </Component>
);

export const Default = Template.bind({}) as StoryObj<typeof Component>;
