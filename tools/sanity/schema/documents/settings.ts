import { defineType } from 'sanity';

const settings = defineType({
  name: `settings`,
  title: `Settings`,
  type: `document`,
  fields: [
    {
      name: `redirectsArr`,
      title: `Redirects`,
      type: 'array',
      of: [{ type: `redirect` }]
    }
  ],
  preview: {
    prepare() {
      return {
        title: `Settings`
      };
    }
  }
});

export default settings;
