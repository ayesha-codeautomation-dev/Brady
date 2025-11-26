import { defineField } from 'sanity';

export default defineField({
  name: 'quote',
  title: 'Quote',
  type: 'object',
  fields: [
    defineField({
      name: 'content',
      title: 'Quote',
      type: 'blockContentSimple'
    })
  ],
  preview: {
    select: {
      content: 'content'
    },
    prepare(selection) {
      let textString = '';
      if (selection?.content) {
        textString = selection.content
          .map((block: any) => block.children.map((child: any) => child.text || '').join(''))
          .join(' ');
      }

      return {
        title: textString || 'No content'
      };
    }
  }
});
