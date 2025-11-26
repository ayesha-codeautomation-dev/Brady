'use client';

import React from 'react';
import Section from '@/components/Section';
import Image from '@/components/Image';
import stringClean from '@/tools/helpers/stringClean';
import { IMediaSection } from '@/tools/sanity/schema/sections/shared/mediaSection';
import styles from './styles.module.scss';

const MediaSection: React.FC<IMediaSection> = props => {
  const { mediaType: rawMediaType, image, videoUrl, thumbnail } = props;
  const mediaType = stringClean(rawMediaType);

  return (
    <Section name="MediaSection" className={styles.section} containerClassName={styles.container}>
      {mediaType === 'image' && image?.asset?.url && <Image {...image} aspectRatio="16-9" />}
    </Section>
  );
};

export default MediaSection;
