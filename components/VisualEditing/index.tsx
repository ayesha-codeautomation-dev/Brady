'use client';

import { VisualEditing as VisualEditingNextSanity } from 'next-sanity';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import DisableDraftButton from '../DisableDraftButton';

const VisualEditing = () => {
  // const pathname = usePathname();
  // useEffect(() => {
  //   // If not an iframe or a Vercel Preview deployment, turn off Draft Mode
  //   if (process.env.NEXT_PUBLIC_VERCEL_ENV !== 'preview' && window === parent && !pathname?.startsWith('/studio')) {
  //     location.href = '/api/disable-draft';
  //   }
  // }, [pathname]);
  return (
    <>
      <VisualEditingNextSanity />
      <DisableDraftButton />
    </>
  );
};

export default VisualEditing;
