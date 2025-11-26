import React from 'react';
import Section from '@/components/Section';
import Text from '@/components/Text';
import Layout from '@/components/Layout';
import Link from '@/components/Link';
import classNames from '@/helpers/classNames';
import { getSectionSpacingProps } from '@/tools/helpers/section';
import { ILinksSection } from '@/tools/sanity/schema/sections/shared/linksSection';

import styles from './styles.module.scss';

const LinksSection: React.FC<ILinksSection> = props => {
  const { links: linksGroups, additionalLinks, layout = 'small', className } = props;
  const classes = classNames(styles[`layout-${layout}`]);

  return (
    <Section
      name="LinksSection"
      theme="dark"
      full
      removeTopSpacing
      removeBottomSpacing
      {...getSectionSpacingProps(props)}
      className={className}
    >
      <Layout variant="container-small" className={styles.container}>
        <div className={classes}>
          {linksGroups?.map((linksGroup, index) => {
            const { groupTitle, links } = linksGroup;
            return (
              <div key={index} className={styles.linksGroup}>
                <div className={styles.title}>
                  <Text text={groupTitle} size="h2" />
                </div>

                <div className={styles.links}>
                  {links.map((linkItem, index) => {
                    const { label, link } = linkItem;
                    return <Link key={index} {...link} text={label} className={styles.link} />;
                  })}
                </div>
              </div>
            );
          })}
        </div>

        {additionalLinks && (
          <div className={styles.linksAdditional}>
            <div className={styles.title}>
              <Text text={additionalLinks.groupTitle} size="h2" />
            </div>

            <div className={styles.links}>
              {additionalLinks.links.map((linkItem, index) => {
                const { label, link } = linkItem;
                return <Link key={index} {...link} text={label} variant="normal-sm" />;
              })}
            </div>
          </div>
        )}
      </Layout>
    </Section>
  );
};

export default LinksSection;
