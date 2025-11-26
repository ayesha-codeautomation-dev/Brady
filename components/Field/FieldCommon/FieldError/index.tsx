import * as React from 'react';
import classNames from 'classnames';
import Text from '@/components/Text';
import styles from './styles.module.scss';

type FieldErrorProps = {
  error?: {
    type: string;
    message: string;
  };
  className?: string;
};

const FieldError: React.FC<FieldErrorProps> = props => {
  const { error, className } = props;
  const errorType = error?.type;
  const errorMessage = error?.message;
  const message = errorType === 'required' ? 'This field is required' : errorMessage;
  const classes = classNames(styles.container, { [styles.hasError]: !!error }, className);

  return null;

  // return (
  //   <div className={classes}>
  //     <Text as="span" className={styles.message} text={message} />
  //   </div>
  // );
};

export default FieldError;
