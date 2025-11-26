import { FAQPage, WithContext } from 'schema-dts';

type FaqPageProps = {
  faqs: {
    question: string;
    answer: string;
  }[];
};

const faqPage = (props: FaqPageProps): WithContext<FAQPage> => {
  const { faqs } = props;
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer
      }
    }))
  };
};

export default faqPage;
