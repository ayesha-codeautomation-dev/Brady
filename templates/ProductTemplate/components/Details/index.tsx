'use client';

import React, { useState } from 'react';
import Section from '@/components/Section';
import Description from '../Description';
import Gallery from '../Gallery';
import Text from '@/components/Text';
import Form from '../Form';
import Button from '@/components/Button';
import Container from '@/components/Container';

import { GetProductByHandleResponse, GetProductRecommendationsResponse } from '@/tools/apis/shopify';
import { IProductDocument } from '@/tools/sanity/schema/documents/product';
import { ISizeGuideDocument } from '@/tools/sanity/schema/documents/sizeGuideDocument';
import styles from './styles.module.scss';
import Price from '@/templates/ProductTemplate/components/Price';

type DetailsProps = {
  sanityProductData: IProductDocument;
  sanitySizeGuide: ISizeGuideDocument;
  shopifyProductData: GetProductByHandleResponse;
  shopifyProductRecommendations: GetProductRecommendationsResponse;
};

const Details: React.FC<DetailsProps> = ({ sanityProductData, shopifyProductData, sanitySizeGuide }) => {
  const [selectedVariant, setSelectedVariant] = React.useState(null);
  const { price, compareAtPrice } = setSelectedVariant || {};

  const handleOnClickGoTo = (id: string) => {
    const element = document.getElementById(id);
    const offset = 128;
    if (element) {
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <Section theme="dark" spacing="none" full>
      <div className={styles.section}>
        <div className={styles.container}>
          <div className={styles.containerSticky}>
            <Container>
              <div id="details" className={styles.details}>
                <Description
                  title={sanityProductData.store.title}
                  descriptionHtml={shopifyProductData?.descriptionHtml}
                  sanitySizeGuide={sanitySizeGuide}
                  collections={shopifyProductData?.collections}
                />
                <Form
                  currencyCode={shopifyProductData?.priceRange?.minVariantPrice?.currencyCode}
                  sanityProductData={sanityProductData}
                  setSelectedVariant={setSelectedVariant}
                />
              </div>
            </Container>
          </div>
        </div>

        <div className={styles.gallery}>
          <div className={styles.headerMobile}>
            <div className={styles.title}>
              <Text size="b2" text={sanityProductData.store.title} />
              <Price price={selectedVariant?.price} compareAtPrice={selectedVariant?.compareAtPrice} />
            </div>

            <Button onClick={() => handleOnClickGoTo('details')} text="Details" variant="square" />
          </div>

          <Gallery
            featureMedia={sanityProductData?.featureMedia}
            gallery={sanityProductData?.gallery}
            images={shopifyProductData?.images?.edges?.map(({ node }) => node)}
          />
        </div>
      </div>
    </Section>
  );
};

export default Details;
