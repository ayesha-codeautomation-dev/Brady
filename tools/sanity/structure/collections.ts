import { StructureBuilder } from 'sanity/structure';

const CollectionsMenuItem = (S: StructureBuilder) =>
  S.listItem().title('Collections').schemaType('collection').child(S.documentTypeList('collection'));

export default CollectionsMenuItem;
