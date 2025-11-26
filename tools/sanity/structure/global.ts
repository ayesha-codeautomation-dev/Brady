import { StructureBuilder } from 'sanity/structure';
import {
  TbMoodSmile,
  TbWorld,
  TbLayoutNavbar,
  TbArrowsDiagonalMinimize,
  TbLayoutBottombar,
  TbBrandInstagram
} from 'react-icons/tb';

const GlobalMenuItem = (S: StructureBuilder) =>
  S.listItem()
    .title('Global')
    .icon(TbWorld)
    .child(() => {
      return S.list()
        .title('Global Data')
        .items([
          // Header
          S.listItem()
            .title('Header')
            .child(S.document().schemaType('headerDocument').documentId('headerDocument'))
            .icon(TbLayoutNavbar),
          // Footer
          S.listItem()
            .title('Footer')
            .child(S.document().schemaType('footerDocument').documentId('footerDocument'))
            .icon(TbLayoutBottombar),
          // Social Media
          S.listItem()
            .title('Social Media')
            .child(S.document().schemaType('socialMediaDocument').documentId('socialMediaDocument'))
            .icon(TbBrandInstagram),
          S.listItem()
            .title('Size Guide')
            .child(S.document().schemaType('sizeGuideDocument').documentId('sizeGuide'))
            .icon(TbArrowsDiagonalMinimize)
          // S.divider()
          // Global Logos
          // S.listItem()
          //   .title('Logos')
          //   .icon(TbMoodSmile)
          //   .child(() => {
          //     return S.documentTypeList('globalLogos')
          //       .title('Logos')
          //       .menuItems(S.documentTypeList('globalLogos').getMenuItems());
          //   })
        ]);
    });

export default GlobalMenuItem;
