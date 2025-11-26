import classNames from '@/helpers/classNames';
import styles from './styles.module.scss';

export interface IconLoaderProps {
  className?: string;
}

const IconLoader = (props: IconLoaderProps) => {
  const { className } = props;
  const classes = classNames(styles.container, className);
  return (
    <div className={classes}>
      <div className={styles.circle}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default IconLoader;
