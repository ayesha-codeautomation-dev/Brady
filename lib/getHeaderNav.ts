// lib/getHeaderNav.ts
import { groq } from 'next-sanity';
import type { IHeaderDocument } from '@/tools/sanity/schema/documents/headerDocument';
import { client } from '@/tools/sanity/lib/client';

export const getHeaderNav = async (): Promise<IHeaderDocument> => {
  const query = groq`
    *[_type == "headerDocument"][0]{
      header{
        navItems[]{
          title,
          side,
          dropdown,
          link,
          navSublinks[]{
            title,
            link,
            navSublinks[]{
              title,
              link,
              navSublinks[]{
                title,
                link
                // Add more nested levels if needed
              }
            }
          }
        }
      }
    }
  `;
  const data = await client.fetch<IHeaderDocument>(query);
  return data;
};
