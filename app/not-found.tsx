import React from 'react';
import Link from '@/components/Link';
import Section from '@/components/Section';
import Header from '@/components/Header';
import { sanityFetch } from '@/tools/sanity/lib/fetch';
import { IHeaderDocument } from '@/tools/sanity/schema/documents/headerDocument';
import { HEADER_QUERY } from '@/tools/sanity/lib/queries.groq';

const NotFound = async () => {
  const headerDocument = await sanityFetch<IHeaderDocument>({ query: HEADER_QUERY });

  return (
    <>
      <Header {...headerDocument} isPageNotFound />
      <main
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'flex-end',
          minHeight: '80vh'
        }}
      >
        <Section>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <Link href="/" text="Return to Brady Legler" variant="normal-sm" />
          </div>
        </Section>
      </main>
    </>
  );
};

export default NotFound;
