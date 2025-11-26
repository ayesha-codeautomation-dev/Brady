import React from 'react';
import classNames from '@/helpers/classNames';
import styles from './styles.module.scss';

interface ContainerProps {
  children: React.ReactNode;
  style?: object;
  ref?: React.Ref<HTMLElement>;
  className?: string;
}

const Container = React.forwardRef<HTMLDivElement, ContainerProps>((props, ref) => {
  const { className, children, style } = props;
  const classes = classNames(styles.container, className);
  return (
    <div className={classes} style={style || {}} ref={ref}>
      {children}
    </div>
  );
});

Container.displayName = 'Container';

export default Container;
