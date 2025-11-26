'use client';

import React, { useState } from 'react';
import Text from '@/components/Text';
import Link from '@/components/Link';
import { IListArtworkSection } from '@/tools/sanity/schema/sections/shared/listArtworkSection';
import Layout from '@/components/Layout';
import Image from '@/components/Image';
import classNames from '@/tools/helpers/classNames';
import styles from './styles.module.scss';
import TextBlock from '@/components/TextBlock';

type ArtworkProps = IListArtworkSection['artworks'][0];

const ArtworkSold: React.FC<ArtworkProps> = props => {
  const { _id: id, pathname, title, featureImage, specification, content } = props;
  const [isHover, setIsHover] = useState(false);

  return (
    <Layout variant="container" className={classNames(styles.artwork, { [styles.hover]: isHover })}>
      <Image {...featureImage} className={styles.image} />
      <div className={styles.content}>
        <Text as="h2" text={title} size="h2" />
        {(specification || content) && (
          <div className={styles.details}>
            {specification && <Text text={specification} size="b1" />}
            {content && <TextBlock blocks={content} config={{ p: { size: 'b1' } }} />}
          </div>
        )}
        <Link
          href={pathname}
          className={styles.button}
          variant="square"
          onMouseOver={() => setIsHover(true)}
          onMouseLeave={() => setIsHover(false)}
          disabled={true}
          text="Sold"
        />
      </div>
    </Layout>
  );
};

export default ArtworkSold;
