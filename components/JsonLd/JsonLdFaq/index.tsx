import faqPage from '../schemas/faqPage';

type JsonLdFaqProps = {
  faqs: {
    question: string;
    answer: string;
  }[];
};

const JsonLdFaq = (props: JsonLdFaqProps) => {
  const { faqs } = props;

  const jsonLdSchema = faqPage({
    faqs
  });

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdSchema) }} />
    </>
  );
};

export default JsonLdFaq;
