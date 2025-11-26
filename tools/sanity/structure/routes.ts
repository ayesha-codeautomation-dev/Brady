import { StructureBuilder } from 'sanity/structure';
import { TbRoad } from 'react-icons/tb';

const RoutesMenuItem = (S: StructureBuilder) => {
  const items = [];

  if (process.env.NODE_ENV === 'development') {
    items.push(S.divider());
    items.push(
      S.listItem()
        .title('Routes')
        .icon(TbRoad)
        .child(() => S.documentTypeList('route').title('Routes').menuItems(S.documentTypeList('route').getMenuItems()))
    );
  }

  return items;
};

export default RoutesMenuItem;
