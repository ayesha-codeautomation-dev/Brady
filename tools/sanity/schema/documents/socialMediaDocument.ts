import { defineType } from 'sanity';
import {
  TbBrandFacebook,
  TbBrandX,
  TbBrandLinkedin,
  TbBrandInstagram,
  TbBrandYoutube,
  TbMoodSmile
} from 'react-icons/tb';

const socialMediaItem = defineType({
  name: 'socialMediaItem',
  title: 'Social Media Item',
  type: 'object',
  fields: [
    {
      name: 'name',
      title: 'Name',
      description: 'If your desired social media platform is not listed, please contact your developer.',
      type: 'string',
      options: {
        list: [
          { value: 'facebook', title: 'Facebook' },
          { value: 'x', title: 'X (Twitter)' },
          { value: 'linkedin', title: 'LinkedIn' },
          { value: 'instagram', title: 'Instagram' },
          { value: 'youtube', title: 'YouTube' }
        ]
      }
    },
    {
      name: 'link',
      description: 'Link to social media page',
      title: 'Link',
      type: 'url'
    }
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'link'
    },
    prepare(selection) {
      const icons = {
        facebook: TbBrandFacebook,
        x: TbBrandX,
        linkedin: TbBrandLinkedin,
        instagram: TbBrandInstagram,
        youtube: TbBrandYoutube,
        no_platform_selected: TbMoodSmile
      };
      const title = selection.title || 'no_platform_selected';
      const subtitle = selection.subtitle || '';
      return {
        title: title.charAt(0).toUpperCase() + title.slice(1),
        subtitle,
        media: icons[title] || TbMoodSmile
      };
    }
  }
});

const socialMediaDocument = defineType({
  name: `socialMediaDocument`,
  title: `Social Media`,
  type: `document`,
  fields: [
    {
      name: 'socials',
      title: 'Socials',
      type: 'array',
      of: [{ type: 'socialMediaItem' }]
    }
  ],
  preview: {
    prepare() {
      return {
        title: 'Social Media'
      };
    }
  }
});

export { socialMediaDocument, socialMediaItem };
