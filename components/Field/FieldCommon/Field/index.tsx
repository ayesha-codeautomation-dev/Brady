import React from 'react';
import { FieldErrors, UseFormReturn } from 'react-hook-form';
import classNames from '@/helpers/classNames';
import FieldContainer, { FieldContainerProps } from '../FieldContainer';
import FieldLabel from '../FieldLabel';
import FieldError from '../FieldError';
import useFieldError from '../helpers/useFieldError';
import styles from './styles.module.scss';

export type FieldProps = {
  label?: string | React.ReactNode;
  name: string;
  className?: string;
  required?: boolean;
  children?: (props: any) => JSX.Element | JSX.Element[];
  validate?: (value: string) => boolean | string;
  onChange?: ({ value, field }: { value: string; field: any }) => void;
  disabled?: boolean;
  valueAs?: 'number' | 'date';
  register?: UseFormReturn['register'];
  control?: UseFormReturn['control'];
  errors?: FieldErrors;
  align?: FieldContainerProps['align'];
  hideError?: boolean;
};

const Field = (props: FieldProps) => {
  const {
    className,
    onChange,
    valueAs,
    disabled = false,
    children,
    name,
    register,
    label,
    errors,
    validate,
    required = false,
    align,
    hideError = false
  } = props;

  const field =
    register &&
    register(name, {
      validate,
      required,
      valueAsNumber: valueAs === 'number'
    });
  const error = useFieldError({ name, errors });
  const classes = classNames(styles.container, { [styles.error]: !!error, error: !!error }, className);

  if (typeof children !== 'function') throw new Error('Field children must be a function');

  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (field?.onChange) field.onChange(event);
    if (onChange) onChange({ value: event.target.value, field: props });
  };

  return (
    <FieldContainer className={classes} align={align}>
      <FieldLabel name={name} text={label} required={required} />
      {children({
        field: {
          ...field,
          id: name,
          onChange: onChangeHandler,
          disabled,
          className: classNames(styles.input, 'input', { error: !!error })
        },
        hasError: !!error
      })}
      {!hideError && <FieldError error={error} />}
    </FieldContainer>
  );
};

export default Field;
