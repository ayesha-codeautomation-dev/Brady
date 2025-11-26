import classNames from '@/helpers/classNames';
import Text from '@/components/Text';
import styles from './styles.module.scss';

type FieldRadioItemProps = {
  field: any;
  label: string;
  value: string;
  variant?: 'default' | 'pill';
};

const FieldRadioItem = (props: FieldRadioItemProps) => {
  const { label, value, field } = props;
  return (
    <div className={styles.container}>
      <input type="radio" {...field} className={classNames(styles.input, field.className)} id={value} value={value} />
      <label htmlFor={value} className={styles.label}>
        <span className={styles.radio}>
          <span className={styles.radioMarker} />
        </span>
        <Text as="span" text={label} />
      </label>
    </div>
  );
};

export default FieldRadioItem;
