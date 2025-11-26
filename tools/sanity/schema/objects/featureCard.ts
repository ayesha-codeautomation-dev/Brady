import stripTitleTags from '../../helpers/stripTitleTags';

// turn into cards
// Feature card - img, title, content, cta => advanced card
export default {
  name: 'featureCard',
  title: 'Feature Card',
  type: 'object',
  fields: [
    {
      name: `image`,
      title: `Image`,
      type: `imageElementSimple`
    },
    {
      name: 'title',
      title: 'Title',
      type: 'title',
      options: {
        defaultTag: 'span'
      }
    },
    {
      name: `content`,
      title: `Content`,
      type: 'blockContentSimple'
    },
    {
      name: `addButton`,
      title: `Add Button`,
      type: `boolean`,
      initialValue: false
    },
    {
      name: `button`,
      title: `Button`,
      type: `buttonElement`,
      hidden: ({ parent }) => !parent?.addButton
    }
  ],
  preview: {
    select: {
      title: 'title'
    },
    prepare: selection => ({
      title: stripTitleTags(selection?.title)
    })
  }
};
