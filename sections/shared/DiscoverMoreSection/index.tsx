import React from 'react';
import Section from '@/components/Section';
import Text from '@/components/Text';
import Link from '@/components/Link';
import Video from '@/components/Video';
import Image from '@/components/Image';
import Carousel from '@/components/Carousel';
import formatCurrency from '@/helpers/formatCurrency';
import { getSectionSpacingProps } from '@/tools/helpers/section';
import { IDiscoverMoreSection } from '@/tools/sanity/schema/sections/shared/discoverMoreSection';

import styles from './styles.module.scss';

const DiscoverMoreSection: React.FC<IDiscoverMoreSection> = props => {
  const { links, title } = props;

  const breakpoints = {
    '(min-width: 769px)': { active: false }
  };

  return (
    <Section
      name="DiscoverMoreSection"
      theme="dark"
      containerClassName={styles.container}
      {...getSectionSpacingProps(props)}
      full
    >
      <div className={styles.title}>
        <Text text={title} size="b1" />
      </div>

      <Carousel
        className={styles.carousel}
        containerClassName={styles.items}
        options={{
          active: true,
          startIndex: 1,
          loop: true,
          align: 'center',
          breakpoints
        }}
      >
        {links?.map((link, index) => {
          const { featureImage = {}, featureMedia = {}, _type, pathname, store, status } = link;
          const mediaType = featureMedia?.mediaType || 'image';
          const featureMediaEnabled = featureMedia?.enable;
          const fallbackImage = store?.previewImageUrl ? { src: store.previewImageUrl, fill: true } : null;

          const title = _type === 'artwork' ? link?.title : store?.title;
          const slug = store?.slug?.current ? `/${store?.slug?.current}/` : pathname;

          let secondaryText = '';

          if (_type === 'product') {
            secondaryText = formatCurrency({
              amount: store?.priceRange?.minVariantPrice
            });
          }

          if (_type === 'artwork') {
            secondaryText = status === 'onSale' ? 'Available' : 'Sold out';
          }

          if (mediaType === 'video' && featureMediaEnabled) {
            return (
              <Link href={slug} key={index} className={styles.item}>
                <div className={styles.overlay}>
                  <Text size="b1" text={title} color="brand-white" />
                  <Text size="b1" text={secondaryText} color="brand-white" />
                </div>
                <Video
                  className={styles.media}
                  url={featureMedia?.video?.asset?.url}
                  objectFit="contain"
                  controls={false}
                />
              </Link>
            );
          }
          const imageToUse = featureMediaEnabled ? featureMedia?.image : featureImage || featureImage || fallbackImage;

          return (
            <Link href={slug} key={index} className={styles.item}>
              <div className={styles.overlay}>
                <Text size="b1" text={title} color="brand-white" />
                <Text size="b1" text={secondaryText} color="brand-white" />
              </div>
              <Image {...imageToUse} alt={title} className={styles.media} />
            </Link>
          );
        })}
      </Carousel>
    </Section>
  );
};

export default DiscoverMoreSection;
