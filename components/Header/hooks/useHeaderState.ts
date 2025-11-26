'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import useScrollDirection from '@/tools/hooks/useScrollDirection';

type HeaderState = {
  showSearch: boolean;
  setShowSearch: (showSearch: boolean) => void;
  mobileNavOpen: boolean;
  setMobileNavOpen: (mobileNavOpen: boolean) => void;
  hidden: boolean;
  atTop: boolean;
  atBottom: boolean;
  isScrollingDown: boolean;
  isScrollingUp: boolean;
};

type UseHeaderStateProps = {
  alwaysHidden?: boolean;
};

const useHeaderState = (props?: UseHeaderStateProps): HeaderState => {
  const { alwaysHidden = false } = props || {};
  const pathname = usePathname();
  const [showSearch, setShowSearch] = useState<boolean>(false);
  const [mobileNavOpen, setMobileNavOpen] = useState<boolean>(false);
  const [hidden, setHidden] = useState(false);
  const [atTop, setAtTop] = useState(true);
  const [atBottom, setAtBottom] = useState(false);
  const scrollDir = useScrollDirection({ threshold: 40 });

  // Hide header on scroll down
  useEffect(() => {
    let lastScroll = 0;
    const handleScroll = () => {
      const scrollingUp = scrollDir === 'up';
      const THRESHOLD = 96;
      const scrolledPastThreshold = window.scrollY > THRESHOLD;
      const shouldHide = (scrolledPastThreshold && !scrollingUp) || alwaysHidden;

      // Check if we're at the bottom of the page (50px bottom threshold)
      const isAtBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 50;

      lastScroll = window.scrollY;
      setHidden(shouldHide);
      setAtTop(!scrolledPastThreshold);
      setAtBottom(isAtBottom);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrollDir, alwaysHidden]);

  // Close mobile nav when navigating to a new page
  useEffect(() => {
    setMobileNavOpen(false);
    setShowSearch(false);
    document.body.style.overflow = '';
  }, [pathname]);

  // Prevent scrolling while search or mobile nav is open
  useEffect(() => {
    if (showSearch || mobileNavOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [showSearch, mobileNavOpen]);

  // Close mobile nav when search is opened
  useEffect(() => {
    if (showSearch) {
      setMobileNavOpen(false);
    }
  }, [showSearch]);

  // Close search when mobile nav is opened
  useEffect(() => {
    if (mobileNavOpen) {
      setShowSearch(false);
    }
  }, [mobileNavOpen]);

  return {
    showSearch,
    setShowSearch,
    mobileNavOpen,
    setMobileNavOpen,
    hidden: atBottom ? false : hidden,
    atTop,
    atBottom,
    isScrollingDown: scrollDir === 'down',
    isScrollingUp: scrollDir === 'up'
  };
};

export default useHeaderState;
