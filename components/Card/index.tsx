import NextLink from 'next/link';
import classNames from '@/helpers/classNames';
import CardImage from './CardImage';
import CardContent from './CardContent';
import styles from './styles.module.scss';

interface CardProps {
  className?: string;
  children: React.ReactNode;
  variant: 'default' | 'outline';
  href?: string;
}

const Card = (props: CardProps) => {
  const { className, href, children, variant = 'outline' } = props;
  const classes = classNames(styles.card, styles[`variant_${variant}`], className);

  if (href) {
    return (
      <div className={classes}>
        <NextLink href={href} className={classes}>
          <div className={styles.wrapper}>{children}</div>
        </NextLink>
      </div>
    );
  }

  return (
    <div className={classes}>
      <div className={styles.wrapper}>{children}</div>
    </div>
  );
};

Card.Image = CardImage;
Card.Content = CardContent;

export default Card;
