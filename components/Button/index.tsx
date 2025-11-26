'use client';

import React from 'react';
import classNames from '@/helpers/classNames';
import styles from './styles.module.scss';

export type ButtonProps = {
  children?: React.ReactNode;
  className?: string;
  text?: string;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  to?: string;
  ariaLabel?: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  variant?:
    | 'normal-sm'
    | 'normal-sm-light'
    | 'normal-sm-overlay'
    | 'normal-md'
    | 'normal-md-light'
    | 'square'
    | 'square-overlay'
    | 'square-overlay-light'
    | 'content';
  outline?: boolean;
};

const Button = (props: ButtonProps) => {
  const {
    className,
    onClick,
    children,
    type = 'button',
    variant,
    disabled = false,
    outline = false,
    ariaLabel = '',
    text
  } = props;

  const classes = classNames(styles.button, styles[`variant_${variant}`], { [styles.outline]: outline }, className);

  const onClickHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (onClick) onClick(event);
  };

  return (
    <button aria-label={ariaLabel} type={type} disabled={disabled} className={classes} onClick={onClickHandler}>
      {text || children}
    </button>
  );
};

export default Button;
