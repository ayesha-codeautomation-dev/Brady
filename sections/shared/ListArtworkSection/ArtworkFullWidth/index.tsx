'use client';

import React, { useState } from 'react';
import Text from '@/components/Text';
import Link from '@/components/Link';
import { IListArtworkSection } from '@/tools/sanity/schema/sections/shared/listArtworkSection';
import Layout from '@/components/Layout';
import Image from '@/components/Image';
import classNames from '@/tools/helpers/classNames';
import styles from './styles.module.scss';

type ArtworkProps = IListArtworkSection['artworks'][0];

const Artwork: React.FC<ArtworkProps> = props => {
  const { _id: id, pathname, title, featureImage } = props;
  const [isHover, setIsHover] = useState(false);

  return (
    <div key={id} className={classNames(styles.artwork, { [styles.hover]: isHover })}>
      <Layout variant="fullWidth" className={styles.layout}>
        <div className={styles.containerSticky}>
          <Link
            href={pathname}
            className={styles.button}
            variant="square-overlay-light"
            onMouseOver={() => setIsHover(true)}
            onMouseLeave={() => setIsHover(false)}
            text={title}
          />
        </div>
      </Layout>
      <div className={styles.background}>
        <Image {...featureImage} className={styles.bgImage} />
      </div>
    </div>
  );
};

export default Artwork;
