import React from 'react';
import Image, { ImageProps } from '@/components/Image';
import Text from '@/components/Text';
import classNames from '@/helpers/classNames';
import styles from './styles.module.scss';

type AvatarProps = {
  image?: ImageProps;
  name: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showImage?: boolean;
};

const Avatar: React.FC<AvatarProps> = props => {
  const { image, name, className, size = 'md', showImage = true } = props;

  const classes = classNames(styles.avatar, styles[`size_${size}`], className);

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('');
  };

  return (
    <div className={classes}>
      {image && showImage && (
        <div className={styles.image}>
          <Image {...image} alt={name} aspectRatio="1-1" />
        </div>
      )}
      <Text as="span" text={getInitials(name)} />
    </div>
  );
};

export default Avatar;
