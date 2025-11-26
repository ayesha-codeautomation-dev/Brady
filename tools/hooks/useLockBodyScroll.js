import React, { useEffect, useState } from 'react';
import { useMediaQuery } from './useMediaQuery';

// This hook takes a boolean value indicating whether the modal is open
const useLockBodyScroll = ({ disabled = false, mediaQuery = '(max-width: 768px)' }) => {
  const [originalStyle, setOriginalStyle] = useState('');
  const isMobile = useMediaQuery(mediaQuery);

  useEffect(() => {
    // If the modal is open, we want to lock the body scroll
    if (isMobile && disabled) {
      // Store the original value of the body overflow
      setOriginalStyle(window.getComputedStyle(document.body).overflow);
      document.body.style.overflow = 'hidden';

      // When the effect is cleaned up, reset the body overflow to its original value
      return () => (document.body.style.overflow = originalStyle);
    }

    if (!isMobile && disabled) {
      document.body.style.overflow = originalStyle;
    }
  }, [disabled, originalStyle, isMobile]);
};

export default useLockBodyScroll;
