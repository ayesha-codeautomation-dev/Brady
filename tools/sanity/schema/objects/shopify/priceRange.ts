import { defineField } from 'sanity';

interface IPriceRangeObject {
  minVariantPrice: number;
  maxVariantPrice: number;
}

const priceRange = defineField({
  name: 'priceRange',
  title: 'Price range',
  type: 'object',
  options: {
    columns: 2
  },
  fields: [
    {
      name: 'minVariantPrice',
      title: 'Min variant price',
      type: 'number'
    },
    {
      name: 'maxVariantPrice',
      title: 'Max variant price',
      type: 'number'
    }
  ]
});

export default priceRange;
export type { IPriceRangeObject };
