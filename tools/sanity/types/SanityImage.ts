type SanityImageAsset = {
  url: string;
  altText?: string;
  metadata: {
    dimensions: {
      width: number;
      height: number;
    };
    lqip?: string;
  };
};

type SanityImageSimple = {
  asset: SanityImageAsset;
  altText?: string;
};

type SanityAspectRatio = 'natural' | '16-9' | '3-2' | '1-1' | '4-3';

interface SanityImageAdvanced extends SanityImageSimple {
  aspectRatio?: SanityAspectRatio;
}

type SanityImage = SanityImageSimple | SanityImageAdvanced;
