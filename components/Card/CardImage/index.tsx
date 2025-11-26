import classNames from '@/helpers/classNames';
import Image, { ImageProps } from '../../Image';
import styles from './styles.module.scss';

export type CardImageProps = {
  className?: string;
  image: ImageProps;
  overlay?: boolean;
  title: string;
};

const CardImage = (props: CardImageProps) => {
  const { className, image, overlay = true, title } = props;
  const classes = classNames(styles.image, className);

  return (
    <div className={classes}>
      {overlay && <div className={styles.overlay} />}
      <Image {...image} alt={title} ratio="1-1" />
    </div>
  );
};

export default CardImage;
