import { TbCopy } from 'react-icons/tb';
import { defineField, defineType } from 'sanity';
import ShopifyDocumentStatus from '../../components/media/ShopifyDocumentStatus';
import { IShopifyProductVariantObject } from '../objects/shopify/shopifyProductVariant';
import ProductVariantHiddenInput from '../../components/inputs/ProductVariantHidden';

interface IProductVariantDocument {
  _id: string;
  store: IShopifyProductVariantObject;
}

const productVariantDocument = defineType({
  name: 'productVariant',
  title: 'Product variant',
  type: 'document',
  icon: TbCopy,
  fields: [
    // Product variant hidden status
    defineField({
      name: 'hidden',
      type: 'string',
      components: {
        field: ProductVariantHiddenInput
      },
      hidden: ({ parent }) => {
        const isDeleted = parent?.store?.isDeleted;

        return !isDeleted;
      }
    }),
    // Title (proxy)
    defineField({
      title: 'Title',
      name: 'titleProxy',
      type: 'proxyString',
      options: { field: 'store.title' }
    }),
    // Shopify product variant
    defineField({
      name: 'store',
      title: 'Shopify',
      description: 'Variant data from Shopify (read-only)',
      type: 'shopifyProductVariant'
    })
  ],
  preview: {
    select: {
      isDeleted: 'store.isDeleted',
      previewImageUrl: 'store.previewImageUrl',
      sku: 'store.sku',
      status: 'store.status',
      title: 'store.title'
    },
    prepare(selection) {
      const { isDeleted, previewImageUrl, sku, status, title } = selection;

      return {
        media: (
          <ShopifyDocumentStatus
            isActive={status === 'active'}
            isDeleted={isDeleted}
            type="productVariant"
            url={previewImageUrl}
            title={title}
          />
        ),
        subtitle: sku,
        title
      };
    }
  }
});

export default productVariantDocument;
export type { IProductVariantDocument };
