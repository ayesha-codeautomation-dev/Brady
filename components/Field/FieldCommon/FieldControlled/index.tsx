import { useController } from 'react-hook-form';
import classNames from '@/helpers/classNames';
import FieldContainer from '../FieldContainer';
import FieldLabel from '../FieldLabel';
import FieldError from '../FieldError';
import { FieldProps } from '../Field';
import useFieldError from '../helpers/useFieldError';
import styles from './styles.module.scss';

export interface FieldControlledProps extends Omit<FieldProps, 'register' | 'valueAs'> {}

const FieldControlled = (props: FieldProps) => {
  const { className, control, children, name, label, errors, validate, required = false, hideError = fale } = props;

  const { field } = useController({
    name,
    control,
    rules: { required, validate }
  });

  const error = useFieldError({ name, errors });
  const classes = classNames(styles.container, { [styles.error]: !!error }, className);

  if (typeof children !== 'function') throw new Error('Field children must be a function');

  return (
    <FieldContainer className={classes}>
      <FieldLabel name={name} text={label} required={required} />
      {children({ field: { ...field, className: 'input' }, hasError: !!error })}
      {!hideError && <FieldError error={error} />}
    </FieldContainer>
  );
};

export default FieldControlled;
