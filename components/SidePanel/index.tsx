'use client';

import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import Text from '../Text';
import Button from '../Button';
import Layout from '../Layout';
import classNames from '@/tools/helpers/classNames';
import styles from './styles.module.scss';

type SidePanelProps = {
  title: string;
  show: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

const SidePanelBody = (props: { children: React.ReactNode }) => {
  const { children } = props;
  return <div className={styles.body}>{children}</div>;
};

const SidePanelFooter = (props: { children: React.ReactNode; className?: string }) => {
  const { children, className } = props;
  return <div className={classNames(styles.footer, className)}>{children}</div>;
};

const SidePanel = (props: SidePanelProps) => {
  const { title, show, onClose, children } = props;

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (!document.getElementById('modal')) {
      const modalDiv = document.createElement('div');
      modalDiv.setAttribute('id', 'modal');
      document.body.appendChild(modalDiv);
    }
  }, []);

  if (!mounted) return null;

  return createPortal(
    <>
      <div className={classNames(styles.overlay, { [styles.visible]: show })} onClick={onClose} />
      <div className={classNames(styles.container, { [styles.open]: show })}>
        <div className={styles.header}>
          <Text text={title} size="b2" />
          <Button onClick={onClose} variant="normal-sm">
            Close
          </Button>
        </div>

        {children}
      </div>
    </>,
    document.getElementById('modal')
  );
};

SidePanel.Body = SidePanelBody;
SidePanel.Footer = SidePanelFooter;

export default SidePanel;
