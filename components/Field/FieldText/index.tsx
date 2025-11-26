import classNames from '@/helpers/classNames';
import Field, { FieldProps } from '../FieldCommon/Field';
import styles from './styles.module.scss';

interface FieldTextProps extends FieldProps {
  placeholder?: string;
}

const FieldText = (props: FieldTextProps) => {
  const { placeholder } = props;

  return <Field {...props}>{({ field }) => <input {...field} type="text" placeholder={placeholder} />}</Field>;
};

export default FieldText;
