import { ILinkElement } from '../sanity/schema/elements/link';

export const linkEmpty = (link: ILinkElement) => {
  if (!link) return true;

  const { linkType } = link;

  if (!linkType) return true;

  if (linkType === 'internal') {
    return !(link?.internalLink?.slug?.current || link?.internalLink?._ref);
  }

  if (linkType === 'external') {
    return !link?.externalLink;
  }

  if (linkType === 'phone') {
    return !link?.phone;
  }

  if (linkType === 'email') {
    return !link?.email;
  }

  if (linkType === 'action') {
    return !link?.action;
  }

  return false;
};
