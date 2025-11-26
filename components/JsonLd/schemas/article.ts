import { Article, WithContext } from 'schema-dts';

type ArticleProps = {
  documentTitle: string | undefined;
  documentDescription: string | undefined;
  documentImage: string | undefined;
  documentDatePublished: string | undefined;
  documentDateModified: string | undefined;
  siteAuthor: string | undefined;
  siteUrl: string | undefined;
};

const article = (props: ArticleProps): WithContext<Article> => {
  const {
    documentDateModified,
    documentDatePublished,
    documentImage,
    documentTitle,
    documentDescription,
    siteUrl,
    siteAuthor
  } = props;
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    about: [
      {
        '@type': 'Thing',
        name: documentTitle
      }
    ],
    author: {
      '@type': 'Person',
      name: siteAuthor,
      url: `${siteUrl}/`
    },
    datePublished: documentDatePublished,
    dateModified: documentDateModified,
    headline: documentTitle,
    description: documentDescription,
    image: {
      '@type': 'ImageObject',
      url: documentImage
    },
    publisher: {
      '@id': `${siteUrl}/#organization`
    }
  };
};

export default article;
