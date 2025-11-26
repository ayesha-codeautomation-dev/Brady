'use client';

import React from 'react';
import Section from '@/components/Section';
import Layout from '@/components/Layout';
import Image from '@/components/Image';
import Link from '@/components/Link';
import classNames from '@/tools/helpers/classNames';
import { getSectionSpacingProps } from '@/tools/helpers/section';
import styles from './styles.module.scss';
import { ICollectionItem } from '@/tools/sanity/schema/sections/shared/homeCollections';

interface IHomeCollectionsSection {
  title?: string;
  items?: ICollectionItem[]; // make items optional
}

const HomeCollectionsSection: React.FC<IHomeCollectionsSection> = ({ title, items = [] }) => {
  return (
    <Section
      name="HomeCollectionsSection"
      full
      removeBottomSpacing
      removeTopSpacing
      className={styles.section}
      theme="light"
    >
      <Layout variant="fullWidth" className={styles.layout}>
        {title && <h2 className={styles.title}>{title}</h2>}

        <div className={styles.grid}>
          {items.length > 0 ? (
            items.map(item => (
              <Link key={item._key || item.href} href={item.href} className={styles.item}>
                <Image src={item.image.asset.url} alt={item.image.alt || item.name} className={styles.img} />
                <h3 className={styles.name}>{item.name}</h3>
              </Link>
            ))
          ) : (
            <p className={styles.noItems}>No collections available.</p>
          )}
        </div>
      </Layout>
    </Section>
  );
};

export default HomeCollectionsSection;
