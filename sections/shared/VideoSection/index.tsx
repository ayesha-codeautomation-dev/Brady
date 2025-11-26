'use client';

import React from 'react';
import Section from '@/components/Section';
import { IVideoSection } from '@/tools/sanity/schema/sections/shared/videoSection';
import Video from '@/components/Video';
import styles from './styles.module.scss';
import Layout from '@/components/Layout';
import Link from '@/components/Link';
import Text from '@/components/Text';

const VideoSection: React.FC<IVideoSection> = props => {
  const { videoType, videoUrl, thumbnail, videoFile, addButton, button } = props;
  const mediaUrl = videoUrl || videoFile?.asset?.url;

  return (
    <Section name="VideoSection" className={styles.section} containerClassName={styles.container}>
      <Video url={mediaUrl} controls={false} />

      <Layout variant="fullWidth" className={styles.layout}>
        <div className={styles.containerSticky}>
          {addButton && (
            <Link {...button?.link} className={styles.button} variant="square-overlay">
              <Text text={button?.label} weight="medium" />
            </Link>
          )}
        </div>
      </Layout>
    </Section>
  );
};

export default VideoSection;
