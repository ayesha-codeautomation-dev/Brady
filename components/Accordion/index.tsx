'use client';

import React, { useState, useEffect, Children, cloneElement } from 'react';
import Button from '../Button';
import classNames from '@/helpers/classNames';
import styles from './styles.module.scss';
import AccordionItem from './AccordionItem';

type AccordionProps = {
  children: React.ReactElement[];
  activeIndex?: number;
  showAll?: boolean;
  showLimit?: number;
  className?: string;
};

const Accordion = (props: AccordionProps) => {
  const { className, children, activeIndex = -1, showAll = true, showLimit = 5 } = props;

  const [active, setActive] = useState(activeIndex);
  const [limit, setLimit] = useState(showLimit);

  useEffect(() => {
    setActive(activeIndex);
  }, [activeIndex]);

  if (!children) return null;

  const onClickHandler = (index: number) => {
    setActive(state => (state === index ? -1 : index));
  };

  return (
    <div className={classNames(styles.accordion, className)}>
      {Children.map(children, (child, index) => {
        if (!showAll && index >= limit) return null;
        return cloneElement(child, {
          ...child?.props,
          active: active === index,
          setActive: () => onClickHandler(index)
        });
      })}

      {!showAll && children?.length > limit && (
        <div className={styles.action}>
          <Button
            text="Show more"
            size="sm"
            theme="primary"
            variant="pill"
            ariaLabel="Show more"
            onClick={() => setLimit(state => state + showLimit)}
          />
        </div>
      )}
    </div>
  );
};

Accordion.Item = AccordionItem;

export default Accordion;
