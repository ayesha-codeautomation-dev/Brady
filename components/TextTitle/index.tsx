import Text from '@/components/Text';
import stripTitleTags from '@/tools/helpers/stripTitleTags';

export interface TextTitleProps {
  className?: string;
  title?: string;
  variant?: ProjectFontVariant;
  size?: ProjectFontSize;
  color?: ProjectColor;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'span' | null;
}

const TextTitle = (props: TextTitleProps) => {
  const { className, title, variant = 'body', size = 'md', color, as } = props;

  if (!title) return null;

  const { text, as: titleAs } = stripTitleTags(title);

  return <Text as={as || titleAs} text={text} variant={variant} size={size} color={color} className={className} />;
};

export default TextTitle;
