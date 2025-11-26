'use client';

import React from 'react';
import Section from '@/components/Section';
import Layout from '@/components/Layout';
import { ITwoColumnTextSection } from '@/tools/sanity/schema/sections/shared/twoColTextSection';
import styles from './styles.module.scss';
import TextBlock from '@/components/TextBlock';

const TwoColumnTextSection: React.FC<ITwoColumnTextSection> = props => {
  const { contentSideA, contentSideB } = props;

  return (
    <Section name="TwoColumnTextSection" theme="dark" full removeTopSpacing removeBottomSpacing>
      <Layout variant="container-small">
        <div className={styles.container}>
          {contentSideA && (
            <div className={styles.content}>
              <TextBlock blocks={contentSideA} />
            </div>
          )}
          {contentSideB && (
            <div className={styles.content}>
              <TextBlock blocks={contentSideB} />
            </div>
          )}
        </div>
      </Layout>
    </Section>
  );
};

export default TwoColumnTextSection;
