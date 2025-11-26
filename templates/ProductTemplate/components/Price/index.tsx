import React from 'react';
import Text from '@/components/Text';
import styles from './styles.module.scss';
import formatCurrency from '@/helpers/formatCurrency';

type PriceProps = {
  price: string;
  compareAtPrice?: string;
};

const Price: React.FC<PriceProps> = props => {
  const { price, compareAtPrice = '100' } = props;
  const priceFormatted = !!price && formatCurrency({ amount: price });
  const compareAtPriceFormatted =
    !!compareAtPrice && compareAtPrice !== '0' && formatCurrency({ amount: compareAtPrice });

  return (
    <div className={styles.price}>
      <Text as="span" size="b2" className={styles.price} text={priceFormatted} />
      <Text as="span" size="b2" className={styles.compareAtPrice} text={compareAtPriceFormatted} />
    </div>
  );
};

export default Price;
