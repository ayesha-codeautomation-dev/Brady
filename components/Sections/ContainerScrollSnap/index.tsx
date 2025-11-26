'use client';

import React, { useEffect } from 'react';

type ContainerScrollSnapProps = {
  withScrollSnap?: boolean;
  children: React.ReactNode;
};

const ContainerScrollSnap: React.FC<ContainerScrollSnapProps> = props => {
  const { withScrollSnap = false, children } = props;

  useEffect(() => {
    if (withScrollSnap) {
      document.documentElement.classList.add('htmlScrollSnap');
    }

    return () => {
      document.documentElement.classList.remove('htmlScrollSnap');
    };
  }, [withScrollSnap]);

  return children;
};

export default ContainerScrollSnap;
