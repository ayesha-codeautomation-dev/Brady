import type { Meta, StoryObj } from '@storybook/react';
import Text from '@/components/Text';
import dummyImage from '@/assets/images/dummyImage.jpg';
import Animation from './';

const meta = {
  title: 'Elements/Animation',
  component: Animation,
  tags: ['autodocs'],
  args: {
    animation: 'slideUp',
    delay: 0
  }
} satisfies Meta<typeof Animation>;
export default meta;

const Template = (args: typeof Animation) => (
  <Animation {...args} key={JSON.stringify(args)}>
    <Text as="h1" text="This is an example of content animation." />
  </Animation>
);

export const Default = Template.bind({}) as StoryObj<typeof Animation>;
