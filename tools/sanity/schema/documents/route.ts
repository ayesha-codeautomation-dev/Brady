import { TbRoad } from 'react-icons/tb';
import { defineType } from 'sanity';

const route = defineType({
  name: `route`,
  title: `Route`,
  type: `document`,
  icon: TbRoad,
  fields: [
    {
      name: `title`,
      title: `Title`,
      type: `string`,
      readOnly: process.env.NODE_ENV === 'production'
    },
    {
      name: `path`,
      title: `Slug`,
      type: `slugElement`,
      readOnly: process.env.NODE_ENV === 'production'
    },
    {
      name: `description`,
      title: `Description`,
      type: `string`,
      readOnly: process.env.NODE_ENV === 'production'
    }
  ],
  preview: {
    select: {
      title: 'title'
    },
    prepare(selection) {
      return {
        title: selection.title
      };
    }
  }
});

export default route;
