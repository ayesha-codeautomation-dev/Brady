import { TbSection } from 'react-icons/tb';
import defaultSectionGroups from '../../common/defaultSectionGroups';
import internalLabelField from '../../common/internalLabelField';
import ReadOnlyImageInput from '../../../components/ReadOnlyImageInput';
import { defineType } from 'sanity';
import thumbnail from '../../../../../sections/product/ViewedProductsSection/thumbnail.png';

interface IViewedProductsSection {}

const viewedProductsSection = defineType({
  name: 'viewedProductsSection',
  title: 'Viewed Products',
  type: 'object',
  groups: defaultSectionGroups,
  icon: TbSection,
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
    // Define fields here

    {
      name: 'sectionFields',
      title: 'Section Fields',
      type: 'sectionFields',
      group: 'styles'
    }
  ],
  preview: {
    prepare() {
      return {
        title: `Viewed Products`
      };
    }
  }
});

export default viewedProductsSection;
export type { IViewedProductsSection };
