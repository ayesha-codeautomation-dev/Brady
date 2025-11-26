'use client';

import { useCallback, useState } from 'react';
import Image from 'next/image';
import Text from '../Text';
import Link from '../Link';
import Layout from '@/components/Layout';
import { ShopifyProduct } from '@/tools/apis/shopify';
import { IProductDocument } from '@/tools/sanity/schema/documents/product';
import classNames from '@/helpers/classNames';
import { useAnalytics } from '@/tools/analytics';
import Video from '@/components/Video';
import formatCurrency from '@/helpers/formatCurrency';
import styles from './styles.module.scss';

const ProductCard = ({
  shopifyProduct,
  sanityProduct,
  className,
  overlayDetailsOnMobile = false,
  collectionId,
  collectionTitle,
  layoutType
}: {
  shopifyProduct?: ShopifyProduct;
  sanityProduct?: IProductDocument['store'];
  className?: string;
  overlayDetailsOnMobile?: boolean;
  collectionId?: string | number;
  collectionTitle?: string;
  layoutType?: string;
}) => {
  const { trackSelectItem } = useAnalytics();
  const [active, setActive] = useState(false);
  const isList = layoutType === 'list';

  const onProductClick = useCallback(() => {
    setActive(true);
    if (collectionId && collectionTitle && shopifyProduct) {
      trackSelectItem({
        listId: collectionId,
        listName: collectionTitle,
        currency: shopifyProduct.priceRange?.minVariantPrice?.currencyCode,
        item: {
          id: shopifyProduct.id || '',
          name: shopifyProduct?.title,
          category: shopifyProduct?.productType,
          price: shopifyProduct?.priceRange?.minVariantPrice?.amount
        }
      });
    }
  }, [collectionId, collectionTitle, shopifyProduct]);

  const ListLink = ({ title, url }: { title: string; url: string }) => {
    if (!isList) return null;

    return (
      <div className={styles.listLink}>
        <Layout variant="container" className={styles.listLinkContainer}>
          <Link onClick={onProductClick} href={url} variant="square-overlay" text={title} className={styles.link}>
            {title}
          </Link>
        </Layout>
      </div>
    );
  };

  if (sanityProduct) {
    return (
      <div
        key={sanityProduct.gid}
        className={classNames(styles.productCard, className, {
          [styles.active]: active,
          [styles.list]: isList,
          [styles.overlayDetailsOnMobile]: overlayDetailsOnMobile
        })}
      >
        {sanityProduct.previewImageUrl && (
          <Link onClick={onProductClick} href={`/${sanityProduct.slug.current}/`} className={styles.imageLink}>
            <Image
              src={sanityProduct.previewImageUrl}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              alt=""
            />
          </Link>
        )}

        {!isList && (
          <div className={styles.productDetails}>
            <Text text={sanityProduct.title} size="b3" />
            <Text
              text={formatCurrency({ amount: sanityProduct.priceRange?.minVariantPrice })}
              className={styles.productPrice}
              size="b3"
            />
            <Link
              onClick={onProductClick}
              className={styles.overlayButton}
              href={`/${sanityProduct.slug.current}/`}
              variant="square-overlay-light"
            >
              View
            </Link>
          </div>
        )}

        <ListLink url={`/${sanityProduct.slug.current}/`} title={sanityProduct.title} />
      </div>
    );
  }

  if (shopifyProduct) {
    const ShopifyProductMedia = () => {
      const isSanityCollectionMediaEnabled = shopifyProduct?.collectionMedia?.enable;

      if (isSanityCollectionMediaEnabled) {
        const isSanityCollectionMediaVideo = shopifyProduct?.collectionMedia?.mediaType === 'video';
        const isSanityCollectionMediaImage = shopifyProduct?.collectionMedia?.mediaType === 'image';
        const image = shopifyProduct.collectionMedia?.image?.asset;
        const video = shopifyProduct.collectionMedia?.video?.asset;

        if (isSanityCollectionMediaVideo && video) {
          return <Video url={video.url} className={styles.video} objectFit="contain" controls={false} />;
        }

        if (isSanityCollectionMediaImage && image) {
          return (
            <Image
              src={image.url}
              width={image.metadata?.dimensions?.width}
              height={image.metadata?.dimensions?.height}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              alt=""
            />
          );
        }
      }

      // Fallback to Shopify product image
      return (
        <Image
          src={shopifyProduct.images?.edges?.[0]?.node?.src}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          alt=""
        />
      );
    };

    return (
      <div
        key={shopifyProduct.id}
        className={classNames(styles.productCard, className, {
          [styles.active]: active,
          [styles.list]: isList,
          [styles.overlayDetailsOnMobile]: overlayDetailsOnMobile
        })}
      >
        {shopifyProduct.images?.edges?.[0]?.node?.src && (
          <Link onClick={onProductClick} href={`/${shopifyProduct.handle}/`} className={styles.imageLink}>
            <ShopifyProductMedia />
          </Link>
        )}

        {!isList && (
          <div className={styles.productDetails}>
            <div className={styles.productDetailsContainer}>
              <Text text={shopifyProduct.title} size="b3" />
              <Text
                text={formatCurrency({ amount: shopifyProduct.priceRange?.minVariantPrice?.amount || 0 })}
                className={styles.productPrice}
                size="b3"
              />
              <Link
                onClick={onProductClick}
                className={styles.overlayButton}
                href={`/${shopifyProduct.handle}/`}
                variant="square-overlay-light"
              >
                View
              </Link>
            </div>
          </div>
        )}

        <ListLink url={`/${shopifyProduct.handle}/`} title={shopifyProduct.title} />
      </div>
    );
  }
  return null;
};

export default ProductCard;
