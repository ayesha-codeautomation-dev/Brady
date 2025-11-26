'use client';

import React, { useEffect } from 'react';
import classNames from '@/helpers/classNames';
import type { EmblaOptionsType } from 'embla-carousel';
import useEmblaCarousel from 'embla-carousel-react';
import { useCarouselContext } from './CarouselProvider';
import styles from './styles.module.scss';

type CarouselProps = {
  className?: string;
  containerClassName?: string;
  children: React.ReactNode;
  options?: EmblaOptionsType;
  autoplay?: boolean;
};

const Carousel: React.FC<CarouselProps> = props => {
  const { options = {}, children, className, containerClassName } = props;
  const [emblaRef, embla] = useEmblaCarousel(options);
  const { setCarousel } = useCarouselContext();

  useEffect(() => {
    if (!embla) return;

    const onSelect = () => {
      setCarousel({
        ...embla,
        scrollPrevAllowed: embla.canScrollPrev(),
        scrollNextAllowed: embla.canScrollNext(),
        progress: embla.scrollProgress()
      });
    };

    const onInit = () => {
      onSelect();
      setCarousel({
        ...embla,
        scrollPrevAllowed: embla.canScrollPrev(),
        scrollNextAllowed: embla.canScrollNext(),
        progress: embla.scrollProgress()
      });
    };

    // Initial calls
    onSelect();
    onInit();
    embla.on('init', onInit);
    embla.on('select', onSelect);
    return () => {
      if (embla) {
        embla.off('init', onInit);
        embla.off('select', onSelect);
      }
    };
  }, [embla]);

  return (
    <div data-name="Carousel" ref={emblaRef} className={classNames(styles.container, className)}>
      <div className={classNames(styles.wrapper, containerClassName)}>{children}</div>
    </div>
  );
};

export default Carousel;
