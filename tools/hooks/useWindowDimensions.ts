import { useState, useEffect } from 'react';

function useWindowDimensions() {
  const isClient = typeof window === 'object';

  const [windowDimensions, setWindowDimensions] = useState(
    isClient
      ? {
          width: window.innerWidth,
          height: window.innerHeight
        }
      : { width: 0, height: 0 }
  );

  useEffect(() => {
    if (!isClient) {
      return;
    }

    function handleResize() {
      setWindowDimensions({
        width: window.innerWidth,
        height: window.innerHeight
      });
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isClient]);

  return windowDimensions;
}

export default useWindowDimensions;
