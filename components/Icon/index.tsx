import { createElement } from 'react';
import NextImage from 'next/image';
import * as icons from '@/assets/icons';
import classNames from '@/helpers/classNames';
import IconLoader from './IconLoader';
import styles from './styles.module.scss';

export type IconProps = {
  className?: string;
  title?: keyof typeof icons;
  size?: 'sm' | 'md' | 'lg' | 'fluid';
  color?: ProjectColor;
};

const Icon = (props: IconProps) => {
  const { className, title, size, color } = props;

  const classes = classNames(styles.icon, styles[`size_${size}`], styles[`color_${color}`], className);
  const icon = title && icons[title];

  if (!icon) return null;

  // Render svg icons imported as URL (e.g. "import Icon from './icon.svg?url'")
  if (icon?.src) {
    return (
      <div className={classes}>
        <NextImage src={icon.src} alt={icon.title} width={32} height={32} />
      </div>
    );
  }

  // Render svg icons imported as React Component
  return <div className={classes}>{createElement(icon)}</div>;
};

Icon.Loader = IconLoader;

export default Icon;
