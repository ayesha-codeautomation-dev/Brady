import { defineType } from 'sanity';
import { ILinkElement } from './link';

interface IButtonElement {
  label: string;
  link: ILinkElement;
}

const buttonElement = defineType({
  name: 'buttonElement',
  title: 'Link',
  type: 'object',
  fields: [
    {
      name: `label`,
      title: `Label`,
      type: `string`,
      // can't make this required because it will throw an error when add button isn't true
      validation: Rule => Rule.max(48)
    },
    {
      name: `link`,
      title: `Link`,
      type: `linkElement`
    }
  ]
});

export default buttonElement;
export type { IButtonElement };
