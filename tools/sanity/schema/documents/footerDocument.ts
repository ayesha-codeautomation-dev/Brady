import { defineType } from 'sanity';
import { IFooterObject } from '../objects/footer';

interface IFooterDocument {
  footer: IFooterObject;
}

const footer = defineType({
  name: `footerDocument`,
  title: `Footer`,
  type: `document`,
  fields: [
    {
      name: 'footer',
      title: 'Footer',
      type: 'footer'
    }
  ],
  preview: {
    prepare() {
      return {
        title: 'Footer'
      };
    }
  }
});

export default footer;
export type { IFooterDocument };
