import { defineType } from 'sanity';

const imageElementAdvanced = defineType({
  name: `imageElementAdvanced`,
  title: `Image`,
  type: `image`,
  options: {
    hotspot: true
  },
  fields: [
    {
      name: `altText`,
      type: 'string',
      title: 'Alt Text',
      description: 'Important for SEO and accessibility',
      initialValue: process.env.NEXT_PUBLIC_SANITY_PROJECT_NAME
    },
    {
      name: 'aspectRatio',
      title: 'Aspect Ratio',
      type: 'string',
      description: 'Select the aspect ratio. Will default to natural aspect unless specified.',
      fieldset: 'advanced', // Associate this field with the 'advanced' fieldset
      initialValue: 'naturalAspect',
      options: {
        list: [
          { title: 'Natural Aspect', value: 'natural' },
          { title: '1:1', value: '1-1' },
          { title: '4:3', value: '4-3' },
          { title: '16:9', value: '16-9' },
          { title: '21:9', value: '21-9' }
        ],
        layout: 'radio',
        direction: 'horizontal'
      }
    }
  ],
  fieldsets: [
    {
      name: 'advanced',
      title: 'Advanced',
      options: { collapsible: true, collapsed: true, modal: { type: 'dialog' } } // This makes the fieldset collapsible and collapsed by default
    }
  ],
  preview: {
    select: {
      media: 'asset',
      title: 'altText'
    },
    prepare({ title, media }) {
      return {
        title: title || 'Image',
        media: media
      };
    }
  }
});

const imageElementSimple = defineType({
  name: `imageElementSimple`,
  title: `Image`,
  type: `image`,
  options: {
    hotspot: true
  },
  fields: [
    {
      name: `altText`,
      type: 'string',
      title: 'Alt Text',
      initialValue: process.env.NEXT_PUBLIC_SANITY_PROJECT_NAME
    }
  ],
  preview: {
    select: {
      media: 'asset',
      title: 'altText'
    },
    prepare({ title, media }) {
      return {
        title: title || 'Image',
        media: media
      };
    }
  }
});

export { imageElementAdvanced, imageElementSimple };
