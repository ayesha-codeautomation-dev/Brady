import Text from '@/components/Text';
import { getProducts } from '@/tools/apis/shopify';
import Link from 'next/link';

const Swatches = async ({ metafieldListSwatchProductsValue }: { metafieldListSwatchProductsValue?: string }) => {
  if (!metafieldListSwatchProductsValue) return null;
  const productGids: string[] = JSON.parse(metafieldListSwatchProductsValue);
  const productIds = productGids.map(gid => gid.replace('gid://shopify/Product/', ''));
  const products = await getProducts(productIds);
  return (
    <div>
      <Text text="Colours" weight="bold" />
      {products?.map(product => (
        <div key={product.id}>
          <Link href={`/products/${product.handle}/`}>{product.title}</Link>
        </div>
      ))}
    </div>
  );
};

export default Swatches;
