import { defineType } from 'sanity';

const globalLogos = defineType({
  name: `globalLogos`,
  title: `Global Logos`,
  type: `document`,
  fields: [
    {
      name: 'logosSection',
      type: 'logosSection'
    }
  ],
  preview: {
    select: {
      internalLabel: 'logosSection.internalLabel'
    },
    prepare(selection) {
      return {
        title: `Logos`,
        subtitle: selection?.internalLabel || `A row of logos.`
      };
    }
  }
});

export default globalLogos;
