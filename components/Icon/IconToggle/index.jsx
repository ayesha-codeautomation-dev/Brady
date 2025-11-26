import React from 'react';
import classNames from '@/helpers/classNames';
import './style.scss';

const IconToggle = props => {
  const { className, selected } = props;
  const classes = classNames(className, 'icon-toggle', { selected });
  return (
    <div className={classes}>
      <div className="horizontal"></div>
      <div className="vertical"></div>
    </div>
  );
};

export default IconToggle;
