'use client';

import React from 'react';
import Section from '@/components/Section';
import { INewSection } from '@/tools/sanity/schema/sections/newSection';
import styles from './styles.module.scss';

const NewSection: React.FC<INewSection> = props => {
  return (
    <Section name="NewSection" className={styles.section} containerClassName={styles.container}>
      NewSection
    </Section>
  );
};

export default NewSection;
