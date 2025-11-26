import { StructureBuilder } from 'sanity/structure';
import { TbFile } from 'react-icons/tb';

const PageMenuItem = (S: StructureBuilder) =>
  S.listItem()
    .title('Pages')
    .icon(TbFile)
    .child(() => S.documentTypeList('page').title('Pages').menuItems(S.documentTypeList('page').getMenuItems()));

export default PageMenuItem;
