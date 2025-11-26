import Text from '@/components/Text';
import ProductCard from '@/components/ProductCard';
import { GetProductRecommendationsResponse } from '@/tools/apis/shopify';
import styles from './styles.module.scss';

const Recommendations = ({ recommendations }: { recommendations: GetProductRecommendationsResponse }) => {
  return (
    <div>
      <Text as="h2" text="You may also like" size="2xl" />
      <div className={styles.grid}>
        {recommendations?.slice(0, 3).map(product => (
          <ProductCard key={product.id} shopifyProduct={product} />
        ))}
      </div>
    </div>
  );
};

export default Recommendations;
