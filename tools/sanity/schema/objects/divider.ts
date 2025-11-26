import { defineType } from 'sanity';

const divider = defineType({
  name: 'divider',
  title: 'Divider',
  type: 'object',
  fields: [
    {
      name: 'colour',
      title: 'Colour',
      type: 'string',
      options: {
        list: [
          { value: 'white', title: 'White' },
          { value: 'grey', title: 'Grey' },
          { value: 'primary', title: 'Primary' }
        ],
        layout: 'radio',
        direction: 'horizontal'
      }
    }
  ],
  initialValue: {
    colour: 'grey'
  },
  preview: {
    prepare() {
      return {
        title: `Divider`
      };
    }
  }
});

export default divider;
