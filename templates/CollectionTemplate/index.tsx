import Header from './components/Header';
import Products from './components/Products';
import Sections from '@/components/Sections';
import { ICollectionDocument } from '@/tools/sanity/schema/documents/collection';

interface WebPageProps extends PageProps {
  data: ICollectionDocument;
}

const CollectionTemplate = async (props: WebPageProps) => {
  const { data, params, searchParams } = props;
  const sanityCollectionData = data;

  return (
    <>
      <Header sanityCollectionData={sanityCollectionData} />
      <Products sanityCollectionData={sanityCollectionData} params={params} searchParams={searchParams} />
      <Sections sections={sanityCollectionData?.sections} params={params} searchParams={searchParams} />
    </>
  );
};

export default CollectionTemplate;
