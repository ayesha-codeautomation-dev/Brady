'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import Icon from '@/components/Icon';
import Link from '@/components/Link';
import Button from '@/components/Button';
import styles from './styles.module.scss';

export type ShareSocial = 'facebook' | 'twitter' | 'linkedin';

export interface SocialsShareProps {
  className?: string;
  url?: string;
  text?: string;
  socials?: ShareSocial[];
  copyLink?: boolean;
  variant?: 'pill' | 'text';
  position?: 'left' | 'right';
}

const SocialsShare: React.FC<SocialsShareProps> = props => {
  const { socials = ['twitter', 'facebook', 'linkedin'], url, copyLink = true } = props;

  const [isCopied, setIsCopied] = useState(false);
  const pathname = usePathname();
  const urlToShare = url || process.env.NEXT_PUBLIC_SITE_URL + pathname;

  type ShareTo = {
    url?: string;
    icon?: ShareSocial;
  };

  const shareTo = socials.reduce((accumulator, socialId) => {
    let social: ShareTo = {
      icon: socialId
    };
    switch (socialId) {
      case 'facebook':
        social.url = `https://www.facebook.com/sharer/sharer.php?u=${urlToShare}`;
        break;
      case 'twitter':
        social.url = `https://twitter.com/intent/tweet?url=${urlToShare}`;
        break;
      // case 'pinterest':
      //   social.url = `https://www.pinterest.com/pin/create/button/?url=${urlToShare}`;
      //   break;
      case 'linkedin':
        social.url = `https://www.linkedin.com/sharing/share-offsite/?url=${urlToShare}`;
        break;
      default:
        return accumulator;
    }

    accumulator.push(social);
    return accumulator;
  }, [] as ShareTo[]);

  return (
    <div className={styles.container}>
      {copyLink && (
        <Button
          className={styles.socialLink}
          onClick={() => {
            navigator.clipboard.writeText(urlToShare);
            setIsCopied(true);
            setTimeout(() => {
              setIsCopied(false);
            }, 3000);
          }}
          ariaLabel="Copy link to clipboard"
        >
          <Icon className={styles.socialIcon} title="link" size="fluid" />
        </Button>
      )}

      {shareTo?.map(social => {
        const { url, icon } = social;
        return (
          <Link className={styles.socialLink} key={icon} href={url} target="_blank">
            <Icon className={styles.socialIcon} title={icon} size="fluid" />
          </Link>
        );
      })}
    </div>
  );
};

export default SocialsShare;
