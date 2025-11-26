import React from 'react';
import Button, { ButtonProps } from '@/components/Button';
import { FieldProps } from '../FieldCommon/Field';
import FieldContainer, { FieldContainerProps } from '../FieldCommon/FieldContainer';
import classNames from '@/helpers/classNames';
import styles from './styles.module.scss';

type FieldSubmitProps = Omit<FieldProps, 'name'> &
  Omit<ButtonProps, 'type'> & {
    align?: FieldContainerProps['align'];
    text?: string;
    textSubmit?: string;
    children?: React.ReactNode;
    isSubmitting?: boolean;
  };

const FieldSubmit: React.FC<FieldSubmitProps> = props => {
  const { children, className, isSubmitting, align, register, control, errors, ...buttonProps } = props;

  return (
    <FieldContainer align={align}>
      <Button className={classNames(styles.button, className)} variant="normal-sm" type="submit" {...buttonProps}>
        {children}
      </Button>
    </FieldContainer>
  );
};

export default FieldSubmit;
