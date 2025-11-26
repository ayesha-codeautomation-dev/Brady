import { ListItem, WithContext } from 'schema-dts';

type ListItemProps = {
  position: number;
  name: string | undefined;
  item: string;
};

const listItem = (props: ListItemProps): WithContext<ListItem> => {
  const { position, name, item } = props;
  return {
    '@context': 'https://schema.org',
    '@type': 'ListItem',
    position: position,
    name: name,
    item: item
  };
};

export default listItem;
