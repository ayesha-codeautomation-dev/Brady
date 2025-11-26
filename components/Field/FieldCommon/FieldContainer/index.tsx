import classNames from '@/helpers/classNames';
import styles from './styles.module.scss';

export type FieldContainerProps = {
  className?: string;
  children: React.ReactNode;
  align?: 'left' | 'right' | 'none';
};

const FieldContainer = (props: FieldContainerProps) => {
  const { className, children, align = 'none' } = props;
  return <div className={classNames('field', styles.container, styles[`align_${align}`], className)}>{children}</div>;
};

export default FieldContainer;
