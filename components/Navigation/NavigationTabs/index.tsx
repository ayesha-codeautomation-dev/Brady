'use client';

import { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Link from '../../Link';
import Text from '../../Text';
import classNames from '@/helpers/classNames';
import styles from './styles.module.scss';

interface NavigationTabsProps {
  tabs?: string[];
  className?: string;
  path: string;
  view?: string;
  current?: string;
  param?: string;
}

const NavigationTabs = (props: NavigationTabsProps) => {
  const { tabs, className, path, current, param = 'view' } = props;
  const classes = classNames(styles.tabs, className);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const isValid = tabs?.find(tab => tab.toLowerCase() === current);
    if (!isValid) {
      router.replace(`${pathname}?${param}=${tabs?.[0].toLowerCase()}`);
    }
  }, [tabs, current, pathname, router, param]);

  if (!tabs) return null;

  return (
    <div className={classes}>
      {tabs?.map(tab => {
        const value = tab.toLowerCase();
        const isCurrent = current === value;
        const tabClasses = classNames(styles.tab, isCurrent && styles.active);
        return (
          <Link
            className={tabClasses}
            key={tab}
            to={`${path}?${param}=${value}`}
            variation="pill"
            color="primary"
            size="lg"
            active={isCurrent}
          >
            <Text text={tab} />
          </Link>
        );
      })}
    </div>
  );
};

export default NavigationTabs;
