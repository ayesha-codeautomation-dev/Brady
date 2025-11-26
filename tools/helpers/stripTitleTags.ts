import { TextProps } from '@/components/Text';

// Strips h1, h2, h3, h4, h5, h6 & span tags from html string
const stripTitleTags = (value = ''): { text: string; as: TextProps['as'] } => {
  if (!value) {
    return {
      text: '',
      as: 'h2'
    };
  }

  // Regular expression to find the opening tag
  const openingTagRex = /<(h[1-6]|span)>/;
  const match = value.match(openingTagRex);

  // Extract the text without tags
  const text = value.replace(/<(h[1-6]|span)>|<\/(h[1-6]|span)>/g, '');

  // Extract the tag name from the opening tag, default to 'h2' if not found
  const detectedAs = match?.[1];
  const validAs: TextProps['as'][] = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'span'];
  const isValidAs = detectedAs && validAs.includes(detectedAs as TextProps['as']);
  const as: TextProps['as'] = isValidAs ? (detectedAs as TextProps['as']) : 'h2';
  return {
    text,
    as
  };
};

export default stripTitleTags;
