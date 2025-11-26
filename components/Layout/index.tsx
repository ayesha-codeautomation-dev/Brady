import React, { createElement } from 'react';
import styles from './styles.module.scss';
import classNames from '@/helpers/classNames';

type LayoutProps = {
  as?: 'div' | 'section' | 'nav';
  children: React.ReactElement<HTMLDivElement>[] | React.ReactElement<HTMLDivElement> | React.ReactNode[];
  variant:
    | 'fullWidth'
    | 'leftLarge'
    | 'rightLarge'
    | 'leftLargeFullWidth'
    | 'rightLargeFullWidth'
    | 'header'
    | 'fluid'
    | 'fluid-quotes'
    | 'grid'
    | 'list'
    | 'container'
    | 'container-small';
  className?: string;
  id?: string;
  style?: React.CSSProperties;
};

const Layout: React.FC<LayoutProps> = props => {
  const { as = 'div', variant, children, className, id, style } = props;

  // Runtime check to ensure all children are div elements so that the layout can be styled correctly
  // React.Children.forEach(children, (child) => {
  //   if (child.type !== 'div') {
  //     throw new Error('All children of Layout must be div elements');
  //   }
  // });

  return createElement(
    as,
    { className: classNames(styles.layout, className, styles[`layout-${variant}`]), id, style },
    children
  );
};

export default Layout;
