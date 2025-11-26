import { WebPage, WithContext } from 'schema-dts';

type WebPageArgs = {
  documentTitle: string | undefined;
  documentDescription: string | undefined;
  documentDatePublished: string | undefined;
  documentDateModified: string | undefined;
  documentImage: string | undefined;
  siteName: string | undefined;
  siteAuthor: string | undefined;
  siteLanguage: string;
  siteUrl: string | undefined;
  year: number;
};

const webPage = (props: WebPageArgs): WithContext<WebPage> => {
  const {
    siteUrl,
    siteName,
    siteLanguage,
    siteAuthor,
    documentTitle,
    documentDescription,
    documentDatePublished,
    documentDateModified,
    documentImage,
    year
  } = props;

  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    headline: documentTitle,
    description: documentDescription,
    inLanguage: siteLanguage,
    name: siteName,
    author: {
      '@type': 'Person',
      name: siteAuthor,
      url: `${siteUrl}/`
    },
    copyrightHolder: {
      '@type': 'Person',
      name: siteAuthor
    },
    copyrightYear: year,
    creator: {
      '@type': 'Person',
      name: siteAuthor
    },
    datePublished: documentDatePublished,
    dateModified: documentDateModified,
    image: {
      '@type': 'ImageObject',
      url: documentImage
    }
  };
};

export default webPage;
