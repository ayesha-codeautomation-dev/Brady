import Field, { FieldProps } from '../FieldCommon/Field';
import classNames from '@/helpers/classNames';
import styles from './styles.module.scss';

interface FieldToggleProps extends FieldProps {
  placeholder?: string;
  disabled?: boolean;
}

const FieldToggle = (props: FieldToggleProps) => {
  const { name, className } = props;

  return (
    <Field {...props} className={classNames(styles.container, className)}>
      {({ field, hasError }) => {
        return (
          <>
            <input
              {...field}
              id={name}
              type="checkbox"
              className={classNames(styles.input, { [styles.error]: hasError })}
            />
            <label htmlFor={name} className={classNames(styles.label, { [styles.error]: hasError })} />
          </>
        );
      }}
    </Field>
  );
};

export default FieldToggle;
