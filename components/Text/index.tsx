import { createElement } from 'react';
import classNames from '@/helpers/classNames';
import stringTrim from '@/tools/helpers/stringTrim';
import styles from './styles.module.scss';

type TextSpacing = '2xs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export interface TextProps {
  children?: any;
  className?: string;
  text?: string | number | undefined | null;
  textTrim?: number;
  textTrimEnd?: string;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'ol' | 'ul' | 'li' | 'blockquote' | 'label';
  size?: 'h1' | 'h2' | 'b1' | 'b2' | 'b3';
  color?: ProjectColor;
  spacing?: TextSpacing | [TextSpacing, TextSpacing]; // array maps to class names spacing_top_<value>, spacing_bottom_<value>
  weight?: 'light' | 'regular' | 'medium' | 'semibold' | 'bold';
  textTransform?: 'uppercase' | 'lowercase' | 'capitalize';
}

const Text = (props: TextProps) => {
  const {
    as = 'span',
    children,
    className,
    text,
    size,
    color,
    weight,
    spacing,
    textTrim = 0,
    textTrimEnd = '...',
    textTransform
  } = props;

  if (!as) return children || text;

  const spacingClasses =
    typeof spacing === 'string'
      ? [styles[`spacing_${spacing}`]]
      : [styles[`spacing_top_${spacing?.[0]}`], styles[`spacing_bottom_${spacing?.[1]}`]];

  const classes = classNames(
    styles.text,
    styles[`color_${color}`],
    styles[`size_${size}`],
    styles[`weight_${weight}`],
    styles[`textTransform_${textTransform}`],
    ...spacingClasses,
    className
  );

  let textValue = text;
  if (text && textTrim > 0) {
    const [textTrimmed] = stringTrim({ text, length: textTrim, end: textTrimEnd });
    textValue = textTrimmed;
  }

  const TextComponent = createElement(as, { className: classes }, children || textValue);

  return TextComponent;
};

export default Text;
