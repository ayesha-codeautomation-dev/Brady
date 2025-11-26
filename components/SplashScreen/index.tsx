'use client';

import React, { useEffect, useState } from 'react';
import Text from '@/components/Text';
import styles from './styles.module.scss';

type SplashScreenProps = {
  title: string;
};

const SplashScreen: React.FC<SplashScreenProps> = props => {
  const { title } = props;
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsExiting(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`${styles.splashScreen} ${isExiting ? styles.exit : ''}`}>
      <div className={styles.content}>
        <Text text={title} size="b1" />
      </div>
    </div>
  );
};

export default SplashScreen;
