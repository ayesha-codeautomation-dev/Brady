import { TbColumns2 } from 'react-icons/tb';
import defaultSectionGroups from '../../common/defaultSectionGroups';
import internalLabelField from '../../common/internalLabelField';
import ReadOnlyImageInput from '../../../components/ReadOnlyImageInput';
import { defineType } from 'sanity';
import thumbnail from '../../../../../sections/shared/TwoColumnTextSection/thumbnail.png';

interface ITwoColumnTextSection {
  contentSideA: SanityTextBlock[];
  contentSideB: SanityTextBlock[];
}

const twoColTextSection = defineType({
  name: 'twoColTextSection',
  title: 'Two Column - Text',
  type: 'object',
  groups: defaultSectionGroups,
  icon: TbColumns2,
  fields: [
    internalLabelField,
    {
      name: 'sectionPreview',
      title: 'Section Preview',
      type: 'image',
      components: { input: ReadOnlyImageInput },
      // @ts-ignore
      imageUrl: thumbnail.src,
      readOnly: true,
      group: 'internal'
    },
    {
      name: `contentSideA`,
      title: `Content - Side A`,
      type: 'blockContentStandard',
      group: 'data'
    },
    {
      name: `contentSideB`,
      title: `Content - Side B`,
      type: 'blockContentStandard',
      group: 'data'
    }
  ],
  preview: {
    select: {
      internalLabel: 'internalLabel'
    },
    prepare(selection) {
      return {
        title: `Two Column - Text`,
        subtitle: selection?.internalLabel
      };
    }
  }
});

export default twoColTextSection;
export type { ITwoColumnTextSection };
