import { TbLayoutGrid } from 'react-icons/tb';
import defaultSectionGroups from '../../common/defaultSectionGroups';
import internalLabelField from '../../common/internalLabelField';
import ReadOnlyImageInput from '../../../components/ReadOnlyImageInput';
import { defineType } from 'sanity';
import thumbnail from '../../../../../sections/shared/ListArtworkSection/thumbnail.png';
import { IArtwork } from '../../documents/artwork';

interface IListArtworkSection {
  artworks: IArtwork[];
  viewOption?: 'onSale' | 'sold' | 'selected';
}

const listArtworkSection = defineType({
  name: 'listArtwork',
  title: 'List Artworks',
  type: 'object',
  groups: defaultSectionGroups,
  icon: TbLayoutGrid,
  fields: [
    internalLabelField,
    {
      name: 'viewOption',
      type: 'string',
      title: 'Listing options',
      description: 'Select the option to list the artworks',
      initialValue: 'selected',
      group: 'data',
      options: {
        list: [
          { title: 'List all on artworks on sale', value: 'onSale' },
          { title: 'List all sold artworks', value: 'sold' },
          { title: 'List selected artworks', value: 'selected' }
        ],
        layout: 'select'
      }
    },
    {
      name: 'artworks',
      title: 'Artworks',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'artwork' }] }],
      group: 'data',
      hidden: ({ parent }) => parent?.viewOption !== 'selected'
    },
    {
      name: 'sectionPreview',
      title: 'Section Preview',
      type: 'image',
      components: { input: ReadOnlyImageInput },
      // @ts-ignore
      imageUrl: thumbnail.src,
      readOnly: true,
      group: 'internal'
    }
  ],
  preview: {
    select: {
      internalLabel: 'internalLabel'
    },
    prepare(selection) {
      return {
        title: `List Artworks`,
        subtitle: selection?.internalLabel
      };
    }
  }
});

export default listArtworkSection;
export type { IListArtworkSection };
