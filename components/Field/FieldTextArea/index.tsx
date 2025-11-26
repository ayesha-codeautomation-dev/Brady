import classNames from '@/helpers/classNames';
import Field, { FieldProps } from '../FieldCommon/Field';
import styles from './styles.module.scss';

interface FieldTextAreaProps extends FieldProps {
  placeholder?: string;
  disabled?: boolean;
}

const FieldTextArea = (props: FieldTextAreaProps) => {
  const { placeholder, disabled = false } = props;

  return (
    <Field {...props}>
      {({ field, hasError }) => <textarea {...field} placeholder={placeholder} disabled={disabled} />}
    </Field>
  );
};

export default FieldTextArea;
