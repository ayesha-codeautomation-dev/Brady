import Link from '@/components/Link';
import Text from '@/components/Text';
import classNames from '@/helpers/classNames';
import styles from './styles.module.scss';

export type BreadcrumbsItemProps = {
  href?: string;
  text?: string;
  children?: React.ReactNode;
  active?: boolean;
};

const BreadcrumbsItem: React.FC<BreadcrumbsItemProps> = props => {
  const { href, text, children, active } = props;

  if (!href) return null;

  return (
    <Link className={classNames(styles.link, { [styles.active]: active })} href={href}>
      {children || (
        <Text className={styles.text} text={text} color="themeColor" weight={active ? 'medium' : 'regular'} />
      )}
    </Link>
  );
};

export default BreadcrumbsItem;
