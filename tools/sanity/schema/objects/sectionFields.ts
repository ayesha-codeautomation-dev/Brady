import { defineType } from 'sanity';

const sectionFields = defineType({
  name: 'sectionFields',
  title: 'Section Fields',
  type: 'object',
  fields: [
    {
      name: 'spacingOptions',
      title: 'Spacing Options',
      type: 'spacingOptions'
    }
    // {
    //   name: 'themeOptions',
    //   title: 'Theme Options',
    //   type: 'themeOptions'
    // }
  ]
});

const spacingOptions = defineType({
  name: 'spacingOptions',
  title: 'Spacing Options',
  type: 'object',
  initialValue: {
    removeTopSpacing: false,
    removeBottomSpacing: false
  },
  options: {
    collapsed: false
  },
  fields: [
    {
      name: 'removeTopSpacing',
      title: 'Remove Top Spacing',
      type: 'boolean'
    },
    {
      name: 'removeBottomSpacing',
      title: 'Remove Bottom Spacing',
      type: 'boolean'
    }
  ]
});

// try to use me for most if you need a one-off section specific theme define it in the section
const themeOptions = defineType({
  name: 'themeOptions',
  title: 'Theme Options',
  type: 'object',
  fields: [
    {
      name: 'theme',
      title: 'Theme',
      type: 'string',
      options: {
        list: [
          { value: 'light', title: 'Light' },
          { value: 'dark', title: 'Dark' }
        ],
        layout: 'radio',
        direction: 'horizontal'
      }
    }
  ]
});

export { sectionFields, spacingOptions, themeOptions };
