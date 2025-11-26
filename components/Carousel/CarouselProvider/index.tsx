import React, { createContext, useState, useContext } from 'react';
import type { UseEmblaCarouselType } from 'embla-carousel-react';

type CarouselType = UseEmblaCarouselType[1] & {
  scrollPrevAllowed: boolean;
  scrollNextAllowed: boolean;
  progress: number;
};

type CarouselContextType = {
  carousel: CarouselType | undefined;
  setCarousel: (carousel: CarouselType | undefined) => void;
};

export const CarouselContext = createContext<CarouselContextType>({
  carousel: undefined,
  setCarousel: () => undefined
});

type CarouselProviderProps = {
  children: React.ReactNode;
};

const CarouselProvider: React.FC<CarouselProviderProps> = props => {
  const { children } = props;
  const [carousel, setCarousel] = useState<CarouselType | undefined>(undefined);

  return <CarouselContext.Provider value={{ carousel, setCarousel }}>{children}</CarouselContext.Provider>;
};

export const useCarouselContext = () => {
  return useContext(CarouselContext);
};

export default CarouselProvider;
