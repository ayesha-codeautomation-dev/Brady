'use client';

import { NextStudio } from 'next-sanity/studio';
import config from '../../config';
import styles from './style.module.scss';

const IS_DEV = process.env.NODE_ENV === 'development';

const Studio: React.FC = () => {
  return (
    <div className={`${styles.sanity} ${IS_DEV ? styles.dev : ''}`}>
      <NextStudio config={config} />
    </div>
  );
};

export default Studio;
