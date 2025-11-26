import type { Meta, StoryObj } from '@storybook/react';
import Text from '@/components/Text';
import Accordion from './';

const meta: Meta<typeof Accordion> = {
  title: 'View/Accordion',
  component: Accordion,
  tags: ['autodocs'],
  args: {
    activeIndex: 0,
    showAll: true,
    showLimit: 5
  }
};
export default meta;

const Template = (args: typeof Accordion) => (
  <Accordion {...args}>
    {Array.from({ length: 8 }, (_, index) => (
      <Accordion.Item key={`section-${index + 1}`} title={`Section ${index + 1}`}>
        <Text text={`Content for section ${index + 1}.`} />
      </Accordion.Item>
    ))}
  </Accordion>
);

export const Default = Template.bind({}) as StoryObj<typeof Accordion>;
