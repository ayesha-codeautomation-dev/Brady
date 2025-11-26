import { defineType } from 'sanity';
import { IHeaderObject } from '../objects/header';

interface IHeaderDocument {
  header: IHeaderObject;
}

const header = defineType({
  name: `headerDocument`,
  title: `Header`,
  type: `document`,
  fields: [
    {
      name: 'header',
      title: 'Header',
      type: 'header'
    }
  ],
  preview: {
    prepare() {
      return {
        title: 'Header'
      };
    }
  }
});

export default header;
export type { IHeaderDocument };
