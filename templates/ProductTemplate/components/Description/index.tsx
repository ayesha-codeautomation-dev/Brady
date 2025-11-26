'use client';

import Text from '@/components/Text';
import { useEffect, useState } from 'react';
import SizeGuide from '../SizeGuide';
import { ISizeGuideDocument } from '@/tools/sanity/schema/documents/sizeGuideDocument';

import styles from './styles.module.scss';

const Description = ({
  title,
  descriptionHtml,
  sanitySizeGuide,
  collections
}: {
  title: string;
  descriptionHtml: string | undefined;
  sanitySizeGuide: ISizeGuideDocument;
  collections?: {
    edges: {
      node: {
        title: string;
        id: string;
        handle: string;
      };
    }[];
  };
}) => {
  const [description, setDescription] = useState<string | null>(null);
  const [sizeAndFit, setSizeAndFit] = useState<string | null>(null);
  const [model, setModel] = useState<string | null>(null);

  useEffect(() => {
    if (!descriptionHtml) return;
    const rawDescriptionSplit = descriptionHtml.split('~section~');
    setDescription(rawDescriptionSplit[0]);
    setSizeAndFit(rawDescriptionSplit[1]);
    setModel(rawDescriptionSplit[2]);
  }, []);

  return (
    <div className={styles.container}>
      <Text as="h2" text={title} size="b2" />

      {descriptionHtml && (
        <Text className={styles.description} as="p" size="b3">
          <span dangerouslySetInnerHTML={{ __html: description }} />
        </Text>
      )}

      <SizeGuide sanitySizeGuide={sanitySizeGuide} collections={collections} />
    </div>
  );
};

export default Description;
