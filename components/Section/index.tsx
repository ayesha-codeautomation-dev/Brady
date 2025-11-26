'use client';

import { forwardRef } from 'react';
import classNames from '@/helpers/classNames';
import Container from '../Container';
import { SectionSpacing } from './types';
import stringClean from '@/tools/helpers/stringClean';
import styles from './style.module.scss';

interface SectionProps {
  className?: string;
  containerClassName?: string;
  children: React.ReactNode;
  as?: 'section' | 'header' | 'footer' | 'div';
  theme?: 'dark' | 'light' | 'dark-light' | 'light-dark';
  full?: boolean; // no container
  spacing?: SectionSpacing | [SectionSpacing, SectionSpacing];
  removeTopSpacing?: boolean;
  removeBottomSpacing?: boolean;
  name?: string;
}

const Section = forwardRef<HTMLDivElement, SectionProps>((props, ref) => {
  const {
    className,
    containerClassName,
    as = 'section',
    theme = 'light',
    spacing = 'lg',
    full = false,
    name,
    removeBottomSpacing,
    removeTopSpacing,
    children
  } = props;

  const SectionComponent = as;

  let spacingTop = Array.isArray(spacing) ? spacing[0] : stringClean(spacing);
  if (removeTopSpacing) spacingTop = 'none';

  let spacingBottom = Array.isArray(spacing) ? spacing[1] : stringClean(spacing);
  if (removeBottomSpacing) spacingBottom = 'none';

  const classes = classNames(
    styles.section,
    { [styles[`spacing_bottom_${spacingBottom}`]]: !!spacingBottom },
    { [styles[`spacing_top_${spacingTop}`]]: !!spacingTop },
    className
  );

  return (
    <SectionComponent ref={ref} data-name={name} data-theme={theme} className={classes}>
      {full ? children : <Container className={containerClassName}>{children}</Container>}
    </SectionComponent>
  );
});

Section.displayName = 'Section';

export default Section;
