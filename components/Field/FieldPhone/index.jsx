import classNames from 'classnames';
import React, { lazy, Suspense } from 'react';
import { useController } from 'react-hook-form';
import 'react-phone-number-input/style.css';

import * as styles from './styles.module.scss';
import FieldError from '../FieldError';
import FieldLabel from '../FieldLabel';
import useFieldError from '../helpers/useFieldError';

const PhoneInput = lazy(() =>
  import('react-phone-number-input').then(module => ({
    default: module.default
  }))
);

const validatePhone = async phoneNumber => {
  const { isValidPhoneNumber } = await import('react-phone-number-input');
  return isValidPhoneNumber(phoneNumber);
};

const FieldPhone = props => {
  const { placeholder, className, name, label, required } = props;

  const { field } = useController({
    name,
    type: 'tel',
    rules: {
      required: { value: true, message: 'Please enter valid number' },
      validate: async value => {
        const isValid = await validatePhone(value);
        return isValid || 'Please enter valid number';
      }
    }
  });

  const error = useFieldError({ name });

  return (
    <div className={classNames(styles.container, className)}>
      <FieldLabel name={name} text={label} required={required} />
      <div className={classNames(styles.input, { [styles.error]: !!error })}>
        <Suspense fallback={<input type="phone" placeholder={placeholder} />}>
          <PhoneInput defaultCountry="AU" placeholder={placeholder} {...field} />
        </Suspense>
      </div>
      <FieldError message={error} />
    </div>
  );
};

export default FieldPhone;
