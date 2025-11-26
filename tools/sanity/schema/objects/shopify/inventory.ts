import { defineField } from 'sanity';

interface IInventoryObject {
  isAvailable: boolean;
  management: string;
  policy: string;
}

const inventory = defineField({
  name: 'inventory',
  title: 'Inventory',
  type: 'object',
  options: {
    columns: 3
  },
  fields: [
    // Available
    {
      name: 'isAvailable',
      title: 'Available',
      type: 'boolean'
    },
    // Management
    {
      name: 'management',
      title: 'Management',
      type: 'string'
    },
    // Policy
    {
      name: 'policy',
      title: 'Policy',
      type: 'string'
    }
  ]
});

export default inventory;
export type { IInventoryObject };
