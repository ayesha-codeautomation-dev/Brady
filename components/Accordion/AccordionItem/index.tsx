'use client';

import classNames from '@/helpers/classNames';
import Text from '../../Text';
import Icon from '../../Icon';
import useElementHeight from '@/tools/hooks/useElementHeight';
import styles from './styles.module.scss';

type AccordionItemProps = {
  title: string;
  content?: string;
  children?: React.ReactNode;
  active?: boolean;
  setActive?: () => void;
  className?: string;
  classNameTrigger?: string;
};

const AccordionItem = (props: AccordionItemProps) => {
  const { title, content, children, active, setActive, className, classNameTrigger } = props;

  const classes = classNames(styles.item, { [styles.active]: active }, className);

  const [ref, height] = useElementHeight({ disabled: !active });

  return (
    <div className={classes}>
      <div
        className={classNames(styles.title, classNameTrigger)}
        role="button"
        onClick={setActive}
        onKeyDown={setActive}
        data-name="FAQTitle"
      >
        <Text text={title} size="lg" weight="regular" />
        <Icon className={styles.icon} title="plus" size="lg" color="themeColor" />
      </div>
      <div className={styles.content} style={{ maxHeight: active && height ? height : 0 }}>
        <div className={styles.wrapper} ref={ref}>
          {children || content}
        </div>
      </div>
    </div>
  );
};

export default AccordionItem;
