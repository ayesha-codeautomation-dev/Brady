import classNames from '@/helpers/classNames';
import Field, { FieldProps } from '../FieldCommon/Field';
import styles from './styles.module.scss';

interface FieldRangeProps extends FieldProps {
  step?: number;
  min?: number;
  max?: number;
  hideButtons?: boolean;
  placeholder?: string;
  disabled?: boolean;
}

const FieldRange = (props: FieldRangeProps) => {
  const { step = 1, min = 0, max = 100 } = props;

  return (
    <Field {...props} valueAs="number">
      {({ field }) => {
        return <input {...field} className={classNames(styles.input)} type="range" min={min} max={max} step={step} />;
      }}
    </Field>
  );
};

export default FieldRange;
