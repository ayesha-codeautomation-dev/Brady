import { defineType } from 'sanity';

interface ICustomMedia {
  mediaType: 'video' | 'image';
  image?: SanityImage;
  video?: {
    asset: {
      url: string;
    };
  };
}

const customMedia = defineType({
  name: 'customMedia',
  title: 'Custom Media',
  type: 'object',
  fields: [
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
      hidden: ({ parent }) => parent?.enable === false,
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
  preview: {
    prepare() {
      return {
        title: `Custom Media`
      };
    }
  }
});

export default customMedia;
export type { ICustomMedia };
