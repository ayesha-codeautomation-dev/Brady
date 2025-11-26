import { defineType } from 'sanity';
import { IButtonElement } from '../elements/button';

interface IFooterObject {
  sitemap: {
    groupTitle: string;
    links: IButtonElement[];
  }[];
  disclaimer: SanityTextBlock[];
}

const linkGroup = defineType({
  name: 'linkGroup',
  title: 'Link Group',
  type: 'object',
  fields: [
    {
      name: 'groupTitle',
      title: 'Group Title',
      type: 'string'
    },
    {
      name: 'links',
      title: 'Links',
      type: 'array',
      of: [{ type: 'buttonElement' }]
    }
  ],
  preview: {
    select: {
      subtitle: 'links',
      title: 'groupTitle'
    },
    prepare: selection => ({
      title: selection.title || 'Link Group'
    })
  }
});

const footer = defineType({
  name: 'footer',
  title: 'Footer',
  type: 'object',
  fields: [
    {
      name: 'linkGroup',
      title: 'Footer Navigation',
      type: 'object',
      fields: [
        {
          name: 'links',
          title: 'Links',
          type: 'array',
          of: [{ type: 'buttonElement' }]
        }
      ]
    }
    // {
    //   name: 'sitemap',
    //   title: 'Sitemap',
    //   type: 'array',
    //   of: [{ type: 'linkGroup' }]
    // },
    // {
    //   name: 'disclaimer',
    //   title: 'Disclaimer',
    //   type: 'blockContentSimple'
    // }
  ],
  preview: {
    prepare() {
      return {
        title: `Footer`
      };
    }
  }
});

export { footer, linkGroup };
export type { IFooterObject };
