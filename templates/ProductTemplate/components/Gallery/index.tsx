import React from 'react';
import Image from 'next/image';
import Media from '../Media';
import styles from './styles.module.scss';
import { IFeatureMedia } from '@/tools/sanity/schema/objects/featureMedia';
import { IGallery } from '@/tools/sanity/schema/objects/gallery';

type GalleryProps = {
  featureMedia: IFeatureMedia;
  gallery: IGallery;
  images: any[] | undefined; // Images from Shopify (use as default)
};

const Gallery: React.FC<GalleryProps> = (props: GalleryProps) => {
  const { images, gallery, featureMedia } = props;
  const hasSanityMedias = featureMedia && featureMedia?.enable;

  // Display Shopify medias
  if (!hasSanityMedias) {
    return (
      <div className={styles.container}>
        {images?.map((image, index) => {
          return (
            <Image key={image.id} src={image.src} width={500} height={500} alt="" priority className={styles.image} />
          );
        })}
      </div>
    );
  }

  return (
    <div className={styles.container}>
      {featureMedia && (
        <Media
          size="centered"
          video={featureMedia.video}
          image={featureMedia.image}
          type={featureMedia.mediaType}
          className={styles.featureMedia}
        />
      )}

      {gallery &&
        gallery?.map((media, index: number) => {
          const { type, size } = media;
          const key = `${type}-${index}`;

          if (type === 'galleryImage' && media?.asset) {
            return <Media key={key} size={size} image={media} type="image" />;
          }

          if (type === 'galleryVideo' && media?.video?.asset) {
            return <Media key={key} size={size} video={media?.video} type="video" />;
          }

          return null;
        })}
    </div>
  );
};

export default Gallery;
