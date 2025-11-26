import type { Meta, StoryObj } from '@storybook/react';
import dummyImage from '@/assets/images/dummyImage.jpg';
import Card from './';

const meta = {
  title: 'View/Card',
  component: Card,
  args: {
    variant: 'default'
  }
} satisfies Meta<typeof Card>;
export default meta;

const Template = (args: typeof Card) => (
  <Card {...args}>
    <Card.Image image={dummyImage} title="This is a card image" />
    <Card.Content title={'This is a card title'} subtitle="This is a card subtitle">
      This is a card content
    </Card.Content>
  </Card>
);

export const Default = Template.bind({}) as StoryObj<typeof Card>;
