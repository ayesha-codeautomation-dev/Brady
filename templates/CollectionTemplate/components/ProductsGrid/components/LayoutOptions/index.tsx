'use client';

import React from 'react';
import Button from '@/components/Button';
import classNames from '@/tools/helpers/classNames';
import styles from './styles.module.scss';

const LAYOUT_OPTIONS = ['grid', 'fluid'] as const;
export type LayoutOption = (typeof LAYOUT_OPTIONS)[number];

const LayoutOptions = ({
  layout,
  setLayout
}: {
  layout: LayoutOption;
  setLayout: React.Dispatch<React.SetStateAction<LayoutOption>>;
}) => {
  return (
    <>
      {LAYOUT_OPTIONS.map(option => (
        <Button
          key={option}
          onClick={() => setLayout(option)}
          variant="normal-sm"
          className={classNames(styles.layoutFilter, { [styles.active]: layout === option })}
        >
          {option.charAt(0).toUpperCase() + option.slice(1)}
        </Button>
      ))}
    </>
  );
};

export default LayoutOptions;
