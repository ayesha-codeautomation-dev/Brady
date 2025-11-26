'use client';

import { useState, useRef, useEffect } from 'react';

type UseElementHeightProps = {
  disabled?: boolean;
  delayRefetch?: number;
};

const useElementHeight = (props: UseElementHeightProps): [React.RefObject<HTMLDivElement>, number, () => void] => {
  const { disabled, delayRefetch = 0 } = props || {};
  const ref = useRef<HTMLDivElement>(null);
  const [elementHeight, setElementHeight] = useState(0);

  const updateHeight = () => {
    if (ref.current && ref.current.clientHeight) {
      setElementHeight(ref.current.clientHeight);
    }
  };

  const refetchHeight = () => {
    setTimeout(() => {
      updateHeight();
    }, delayRefetch);
  };

  useEffect(() => {
    // Function to update height

    // Initial update
    updateHeight();

    // Add resize event listener if not disabled
    if (!disabled) {
      window.addEventListener('resize', updateHeight);
    }

    // Cleanup function
    return () => {
      if (!disabled) {
        window.removeEventListener('resize', updateHeight);
      }
    };
  }, [disabled]);

  return [ref, elementHeight, refetchHeight];
};

export default useElementHeight;
