import { StructureBuilder } from 'sanity/structure';
import { TbShoppingBag } from 'react-icons/tb';

const ProductsMenuItem = (S: StructureBuilder) =>
  S.listItem().title('Products').schemaType('product').child(S.documentTypeList('product'));

export default ProductsMenuItem;
