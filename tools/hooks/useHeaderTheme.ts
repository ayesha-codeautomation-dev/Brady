import { useState, useEffect, useRef } from 'react';

type UseHeaderThemeProps = {
  theme: 'dark' | 'light' | 'dark-light' | 'light-dark';
};

const useHeaderTheme = (props: UseHeaderThemeProps) => {
  const { theme } = props;
  const [isInView, setIsInView] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkPosition = () => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        setIsInView(rect.top <= 100 && rect.bottom > 100);
      }
    };

    // Initial check
    checkPosition();

    // Add scroll event listener
    window.addEventListener('scroll', checkPosition);

    // Clean up
    return () => {
      window.removeEventListener('scroll', checkPosition);
    };
  }, []);

  useEffect(() => {
    const themeOptions = ['dark', 'light'];
    if (isInView) {
      document.body.classList.add(theme);
      themeOptions.forEach(option => {
        if (theme !== option) {
          document.body.classList.remove(option);
        }
      });
    }

    return () => {
      themeOptions.forEach(option => {
        document.body.classList.remove(option);
      });
    };
  }, [isInView, theme]);

  return [sectionRef];
};

export default useHeaderTheme;
