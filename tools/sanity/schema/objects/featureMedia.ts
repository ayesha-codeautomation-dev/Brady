import { defineType } from 'sanity';

interface IFeatureMedia {
  enable: boolean;
  mediaType: 'video' | 'image';
  image?: SanityImage;
  video?: {
    url: string;
  };
}

const featureMedia = defineType({
  name: 'featureMedia',
  title: 'Link',
  type: 'object',
  initialValue: {
    enable: false
  },
  fields: [
    {
      name: 'enable',
      title: 'Enable Custom Feature Media',
      description: 'If disabled, the Shopify feature media product will be used',
      type: 'boolean',
      initialValue: false
    },
    {
      name: 'mediaType',
      title: 'Media Type',
      description: 'Select the type of media to display',
      type: 'string',
      options: {
        list: [
          { value: 'image', title: 'Image' },
          { value: 'video', title: 'Video' }
        ],
        layout: 'select',
        direction: 'horizontal'
      },
      hidden: ({ parent }) => parent?.enable !== true,
      initialValue: 'video'
    },
    {
      name: 'image',
      title: 'Image',
      description: 'Select or upload an image file',
      type: 'imageElementSimple',
      hidden: ({ parent }) => parent?.mediaType !== 'image' || parent?.enable === false
    },
    {
      name: 'video',
      title: 'Video',
      description: 'Upload a video file',
      type: 'file',
      hidden: ({ parent }) => parent?.mediaType !== 'video' || parent?.enable === false
    }
  ],
  options: {
    collapsible: false
  }
});

export default featureMedia;
export type { IFeatureMedia };
