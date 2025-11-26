import React from 'react';
import Link from '@/components/Link';
import Icon, { IconProps } from '@/components/Icon';
import classNames from '@/helpers/classNames';
import stringClean from '@/tools/helpers/stringClean';
import styles from './styles.module.scss';

type SocialsProps = {
  className?: string;
  size?: IconProps['size'];
  socials?: {
    name: IconProps['title'];
    link: string;
    _key: string;
  }[];
};

const Socials: React.FC<SocialsProps> = props => {
  const { socials, className, size = 'fluid' } = props;

  if (!socials?.[0]) return null;

  return (
    <div className={classNames(styles.container, className)}>
      {socials?.map(social => {
        const { name: rawName, link, _key: id } = social || {};
        const name = stringClean(rawName) as IconProps['title'];
        return (
          <Link
            key={id}
            className={styles.social}
            href={link}
            title={name}
            target="_blank"
            rel="noopener noreferrer"
            text={name}
            variant="normal-sm"
          />
        );
      })}
    </div>
  );
};

export default Socials;
