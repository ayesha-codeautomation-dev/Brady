'use client';

import React, { useEffect, useState } from 'react';
import Link from '@/components/Link';
import { usePathname } from 'next/navigation';
import styles from './styles.module.scss';
import Button from '../Button';

const DisableDraftButton = () => {
  const [hidden, setHidden] = useState(true);
  const pathname = usePathname();
  useEffect(() => {
    if (!pathname?.startsWith('/studio') && window === parent) {
      setHidden(false);
    }
  }, [pathname]);
  const onClick = async () => {
    await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/disable-draft`);
    window.location.href = pathname;
  };
  if (hidden) return null;
  return (
    <div className={styles.container}>
      <Button onClick={onClick} variant="square" size="md" theme="primary">
        Disable preview mode
      </Button>
    </div>
  );
};

export default DisableDraftButton;
