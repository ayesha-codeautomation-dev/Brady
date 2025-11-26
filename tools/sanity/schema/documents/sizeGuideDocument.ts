import { defineType } from 'sanity';

interface ISizeGuideDocument {
  _id: string;
  _updatedAt: string;
  tables: {
    title: string;
    collections: {
      _ref: string;
      _type: string;
      store?: {
        gid: string;
        v;
      };
    }[];
    Table: {
      rows: {
        _key: string;
        cells: string[];
      }[];
    };
  };
}

const sizeGuideDocument = defineType({
  name: `sizeGuideDocument`,
  title: `Size Guide`,
  type: `document`,
  fields: [
    {
      name: 'tables',
      title: 'Tables',
      type: 'array',
      of: [{ type: 'sizeGuideTable' }]
    }
  ],
  preview: {
    prepare() {
      return {
        title: `Size Guide`
      };
    }
  }
});

export default sizeGuideDocument;
export type { ISizeGuideDocument };
