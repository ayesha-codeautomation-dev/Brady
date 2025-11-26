import { BreadcrumbList, WithContext } from 'schema-dts';

type BreadcrumbListProps = {
  itemListElement: any;
};

const breadcrumbList = (props: BreadcrumbListProps): WithContext<BreadcrumbList> => {
  const { itemListElement } = props;
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    description: 'Breadcrumbs list',
    name: 'Breadcrumbs',
    itemListElement
  };
};

export default breadcrumbList;
