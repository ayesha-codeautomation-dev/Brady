import * as React from 'react';

type ScrollDirection = 'up' | 'down';

// threshold defines how many pixels the user has to scroll before the scroll direction is updated

const useScrollDirection = ({ threshold = 0 }: { threshold?: number }): ScrollDirection => {
  const [scrollDirection, setScrollDirection] = React.useState<ScrollDirection>('up');

  const blocking = React.useRef(false);
  const prevScrollY = React.useRef(0);

  React.useEffect(() => {
    prevScrollY.current = window.scrollY;

    const updateScrollDirection = () => {
      const { scrollY } = window;

      if (Math.abs(scrollY - prevScrollY.current) >= threshold) {
        const newScrollDirection = scrollY > prevScrollY.current ? 'down' : 'up';

        setScrollDirection(newScrollDirection);

        prevScrollY.current = scrollY > 0 ? scrollY : 0;
      }

      blocking.current = false;
    };

    const onScroll = () => {
      if (!blocking.current) {
        blocking.current = true;
        window.requestAnimationFrame(updateScrollDirection);
      }
    };

    window.addEventListener('scroll', onScroll);

    return () => window.removeEventListener('scroll', onScroll);
  }, [scrollDirection]);

  return scrollDirection;
};

export default useScrollDirection;
