import article from '../schemas/article';
import listItem from '../schemas/listItem';
import organization from '../schemas/organization';
import breadcrumbList from '../schemas/breadcrumbList';
import website from '@/config/website';
import { IBlogPostDocument } from '@/tools/sanity/schema/documents/artwork';

type JsonLdProps = {
  document: IBlogPostDocument;
};

const JsonLdArticle = (props: JsonLdProps) => {
  const { document } = props;

  // Site Data
  const siteName = website?.siteName;
  const siteUrl = website?.siteUrl;
  const siteAuthor = website?.author;
  const siteSocials = website?.socialLinks;

  // Document data
  const documentSeo = document?.seoData;
  const documentTitle = documentSeo?.seoTitle;
  const documentDescription = documentSeo?.seoDescription;
  const documentCreatedAt = document?._createdAt;
  const documentUpdatedAt = new Date(document?._updatedAt)?.toISOString();
  const documentDatePublished = documentCreatedAt ? new Date(documentCreatedAt)?.toISOString() : undefined;
  const documentDateModified = documentUpdatedAt ? new Date(documentUpdatedAt)?.toISOString() : undefined;
  const documentImage = documentSeo?.openGraphImage?.asset?.url || `${siteUrl}${website?.banner}`;
  const documentUrl = `${siteUrl}${document?.slug?.current || ''}`;

  const jsonLdSchema = article({
    documentTitle,
    documentDescription,
    documentImage,
    documentDatePublished,
    documentDateModified,
    siteAuthor,
    siteUrl
  });

  const jsonLdOrganization = organization({
    siteName,
    siteUrl,
    siteSocials
  });

  const jsonLdBreadcrumbList = breadcrumbList({
    itemListElement: [
      listItem({
        position: 1,
        name: 'Home',
        item: `${siteUrl}/`
      }),
      listItem({
        position: 2,
        name: documentTitle,
        item: documentUrl
      })
    ]
  });

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdOrganization) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdBreadcrumbList) }} />
    </>
  );
};

export default JsonLdArticle;
