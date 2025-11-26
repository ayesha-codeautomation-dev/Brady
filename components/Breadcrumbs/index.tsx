import { Children } from 'react';
import BreadcrumbsItem, { BreadcrumbsItemProps } from './BreadcrumbsItem';
import styles from './styles.module.scss';

type BreadcrumbsProps = {
  children: React.ReactElement<BreadcrumbsItemProps> | React.ReactElement<BreadcrumbsItemProps>[];
  separator?: string;
};

const Breadcrumbs: React.FC<BreadcrumbsProps> & { Item: React.FC<BreadcrumbsItemProps> } = props => {
  const { children, separator = '/' } = props;

  const childrenArray = Children.toArray(children);
  if (!childrenArray?.[0]) return null;

  return (
    <div className={styles.container}>
      {childrenArray.map((child, index) => {
        const isLast = childrenArray.indexOf(child) === childrenArray.length - 1;
        return (
          <div className={styles.item} key={index}>
            {child}
            {!isLast && <span className={styles.separator}>{separator}</span>}
          </div>
        );
      })}
    </div>
  );
};

Breadcrumbs.Item = BreadcrumbsItem;

export default Breadcrumbs;
