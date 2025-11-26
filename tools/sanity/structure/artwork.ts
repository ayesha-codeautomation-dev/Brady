import { StructureBuilder } from 'sanity/structure';
import { TbHome, TbTags, TbWriting, TbMoodSmile } from 'react-icons/tb';

const ArtworkMenuItem = (S: StructureBuilder) =>
  S.listItem()
    .title('Artwork')
    .icon(TbWriting)
    .child(() =>
      S.list()
        .title('Artwork')
        .items([
          // All Artworks
          S.listItem()
            .title('All Artworks')
            .icon(TbWriting)
            .child(() =>
              S.documentTypeList('artwork')
                .title('All Artworks')
                .menuItems(S.documentTypeList('artwork').getMenuItems())
            ),
          S.divider(),
          // Artworks for Sale
          S.listItem()
            .title('Artworks for Sale')
            .icon(TbWriting)
            .child(() =>
              S.documentTypeList('artwork')
                .title('Artworks for Sale')
                .filter('_type == "artwork" && status == "onSale"')
            ),
          // Sold Artworks
          S.listItem()
            .title('Sold Artworks')
            .icon(TbWriting)
            .child(() =>
              S.documentTypeList('artwork').title('Artworks for Sale').filter('_type == "artwork" && status == "sold"')
            )

          // Posts By Category
          // S.listItem()
          //   .title('Posts By Category')
          //   .icon(TbWriting)
          //   .child(() =>
          //     S.documentTypeList('blogPostCategory')
          //       .title('Posts By Category')
          //       .child(categoryId =>
          //         S.documentTypeList('blogPost')
          //           .title('Posts')
          //           .filter('$categoryId in categories[]._ref')
          //           .params({ categoryId })
          //       )
          //   ),
          // S.divider()
          // Authors
          // S.listItem()
          //   .title('Authors')
          //   .icon(TbMoodSmile)
          //   .child(() =>
          //     S.documentTypeList('author').title('Authors').menuItems(S.documentTypeList('author').getMenuItems())
          //   ),
          // Post Categories
          // S.listItem()
          //   .title('Categories')
          //   .icon(TbTags)
          //   .child(() =>
          //     S.documentTypeList('blogPostCategory')
          //       .title('Categories')
          //       .menuItems(S.documentTypeList('blogPostCategory').getMenuItems())
          //   ),
          // Blog Landing Page
          // S.listItem()
          //   .title('Blog Landing Page')
          //   .child(S.document().schemaType('page').documentId('blogLandingPage'))
          //   .icon(TbHome)
        ])
    );

export default ArtworkMenuItem;
