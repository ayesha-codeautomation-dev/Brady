'use client';

import React, { useState } from 'react';
import classNames from '@/helpers/classNames';
import Container from '@/components/Container';
import Link from '@/components/Link';
import Text from '@/components/Text';
import { ILinkElement } from '@/tools/sanity/schema/elements/link';
import { IHeaderDocument } from '@/tools/sanity/schema/documents/headerDocument';
import styles from './styles.module.scss';

type HeaderNavigationMobileProps = {
  navItems: IHeaderDocument['header']['navItems'];
  mobileNavOpen: boolean;
  setMobileNavOpen: (mobileNavOpen: boolean) => void;
};

const HeaderNavigationMobile: React.FC<HeaderNavigationMobileProps> = props => {
  const { navItems, mobileNavOpen, setMobileNavOpen } = props;

  const navItemsFlattened = navItems.reduce<{ title: string; link: ILinkElement }[]>((acc, navItem) => {
    if (navItem.navSublinks) {
      return [...acc, ...navItem.navSublinks];
    } else {
      acc.push(navItem);
    }
    return acc;
  }, []);

  return (
    <div className={classNames(styles.container, { [styles.show]: mobileNavOpen })}>
      <div className={classNames(styles.buttonContainer)}>
        <div className={styles.button} role="button" onClick={() => setMobileNavOpen(!mobileNavOpen)} />
      </div>

      <div className={styles.navigation}>
        <Container className={styles.navigationContainer}>
          <ul className={styles.links}>
            {navItemsFlattened.map(navItem => {
              const { title, link } = navItem;
              return (
                <li key={navItem.title} className={styles.linkItem}>
                  <Link variant="normal-sm" {...link}>
                    <Text text={title} />
                  </Link>
                </li>
              );
            })}
          </ul>
        </Container>
      </div>
    </div>
  );
};

export default HeaderNavigationMobile;
