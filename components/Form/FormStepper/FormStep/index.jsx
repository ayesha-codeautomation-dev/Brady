import classNames from 'classnames';
import React, { Children, cloneElement } from 'react';

import * as styles from './styles.module.scss';

const FormStep = props => {
  const { children, isPrevious, isCurrentStep, isNext, methods, className } = props;

  const classes = classNames(styles.container, {
    [styles.previous]: isPrevious,
    [styles.next]: isNext,
    [styles.current]: isCurrentStep
  });

  return (
    <div className={classes}>
      <div className={classNames(styles.wrapper, className)}>
        {Children.map(children, child => {
          return cloneElement(child, { register: methods?.register });
        })}
      </div>
    </div>
  );
};

export default FormStep;
