import { useRef, useEffect } from 'react';
import { useSpring } from '@react-spring/web';

/**
 * A custom React hook that calculates the progress of how much an element has been viewed based on its position within the viewport.
 * It leverages `react-spring` to animate this view progress as a spring-based motion value.
 *
 * @returns {Array} A tuple where the first element is the ref to be attached to the DOM element you want to track, and the second element is the spring-animated value representing the view progress.
 */
const useViewProgress = props => {
  const { buffer = 0 } = props || {};
  const ref = useRef(null);

  // Create a spring value for the viewed percentage
  const [{ viewProgress }, setViewProgress] = useSpring(() => ({
    viewProgress: 0,
    config: { mass: 1, tension: 250, friction: 30 }
  }));

  const calculateViewedProgress = () => {
    const element = ref.current;
    if (!element) return;

    const rect = element.getBoundingClientRect();
    const windowHeight = window.innerHeight;

    // Define the start and end points of the element's position in relation to the viewport
    const elementTopToViewportBottom = windowHeight - rect.top;
    const elementBottomToViewportTop = rect.bottom;

    // Calculate the progress with buffer
    let progress = 0;
    // Check if the element is in the viewport
    if (rect.bottom > 0 && rect.top < windowHeight) {
      if (rect.bottom > windowHeight) {
        // Only the top part of the element is visible
        progress = Math.max(0, elementTopToViewportBottom / (rect.height + windowHeight) - buffer);
      } else if (rect.bottom <= 0) {
        // The element has completely passed the viewport
        progress = Math.min(1, 1 + buffer);
      } else {
        // The whole element is visible and exits the viewport
        progress = Math.min(1, 1 - elementBottomToViewportTop / (rect.height + windowHeight) + buffer);
      }
    } else if (rect.top >= windowHeight) {
      // The element has not yet entered the viewport
      progress = Math.max(0, -buffer);
    }

    // Ensure the progress is between 0 and 1
    progress = Math.min(1, Math.max(0, progress));

    setViewProgress.start({ viewProgress: progress });
  };

  // Attach the scroll and resize event listeners
  useEffect(() => {
    const handleScroll = () => {
      window.requestAnimationFrame(calculateViewedProgress);
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleScroll);

    // Initial calculation
    calculateViewedProgress();

    // Clean up the event listeners when the component unmounts
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  return [ref, viewProgress];
};

export default useViewProgress;
