import { createElement } from 'react';
import Link from '@/components/Link';
import classNames from '@/helpers/classNames';
import logo from '@/assets/logo/logo.svg';
import styles from './styles.module.scss';
import Text from '../Text';

interface LogoProps {
  className?: string;
}

const Logo = (props: LogoProps) => {
  const { className } = props;

  const classes = classNames(styles.logo, className);

  if (!logo) return null;

  return (
    <Link className={classes} href="/">
      {createElement(logo)}
    </Link>
  );
};

export default Logo;
