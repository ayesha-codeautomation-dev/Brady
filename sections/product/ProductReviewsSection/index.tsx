'use client';

import React from 'react';
import Section from '@/components/Section';
import Text from '@/components/Text';
import { GetReviewsResponse } from '@/tools/apis/okendo';
// import { IProductReviewsSection } from '@/tools/sanity/schema/sections/productReviewsSection';
import styles from './styles.module.scss';

type Props = {
  reviewsData?: GetReviewsResponse;
  extraData?: {
    ProductReviewsSection?: {
      reviewsData?: GetReviewsResponse;
    };
  };
};

const ProductReviewsSection: React.FC<Props> = props => {
  const reviewsData = props.reviewsData || props?.extraData?.ProductReviewsSection?.reviewsData;

  if (!reviewsData?.reviews || reviewsData?.reviews?.length === 0) return null;

  return (
    <Section name="ProductReviewsSection" className={styles.section} containerClassName={styles.container}>
      <Text as="h2" text="Reviews" size="2xl" />
      <div>
        {reviewsData?.reviews?.map(review => {
          return (
            <div key={review.productId}>
              <div>
                Rating: <Text as="h3" text={review.rating} size="lg" />
              </div>
              <div>
                <Text as="p" text={review.body} />
              </div>
            </div>
          );
        })}
      </div>
    </Section>
  );
};

export default ProductReviewsSection;
