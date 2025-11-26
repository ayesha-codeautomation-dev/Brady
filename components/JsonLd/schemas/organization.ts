import { Organization, WithContext } from 'schema-dts';

type OrganizationProps = {
  siteName: string;
  siteUrl: string | undefined;
  siteSocials: string[];
};

const organizationSchema = (props: OrganizationProps): WithContext<Organization> => {
  const { siteUrl, siteName, siteSocials } = props;
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${siteUrl}/#organization`,
    name: siteName,
    legalName: siteName,
    url: `${siteUrl}/`,
    logo: `${siteUrl}/schema-icon.png`,
    sameAs: siteSocials || []
  };
};

export default organizationSchema;
