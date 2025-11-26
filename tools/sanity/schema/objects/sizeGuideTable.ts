import { defineType } from 'sanity';

interface ISizeGuideTable {
  title: string;
  table: {
    rows: {
      cells: string[];
    }[];
  };
}

const sizeGuideTable = defineType({
  name: 'sizeGuideTable',
  title: 'Link Group',
  type: 'object',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string'
    },
    {
      name: 'collections',
      title: 'Collections',
      description: 'Select collections where this size guide table should be displayed',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'collection' }] }]
    },
    {
      name: 'Table',
      title: 'Table',
      type: 'table'
    }
  ],
  preview: {
    select: {
      title: 'title'
    },
    prepare: selection => ({
      title: selection.title || 'Size Guide'
    })
  }
});

export default sizeGuideTable;
export type { ISizeGuideTable };
