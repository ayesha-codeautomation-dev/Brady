import { defineType } from 'sanity';

const alignMedia = defineType({
  name: 'alignMedia',
  title: 'Align Media',
  description: 'Choose whether to align the media (image, video, etc.) to the right or left of the content.',
  type: 'string',
  options: {
    list: [
      { title: 'Left', value: 'left' },
      { title: 'Right', value: 'right' }
    ],
    layout: 'radio',
    direction: 'horizontal'
  },
  initialValue: 'right'
});

export default alignMedia;
