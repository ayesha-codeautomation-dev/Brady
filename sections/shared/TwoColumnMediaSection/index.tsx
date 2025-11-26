'use client';

import React, { useState } from 'react';
import Section from '@/components/Section';
import Image from '@/components/Image';
import Text from '@/components/Text';
import Link from '@/components/Link';
import classNames from '@/tools/helpers/classNames';
import Layout from '@/components/Layout';
import { ITwoColumnMediaSection } from '@/tools/sanity/schema/sections/shared/twoColMediaSection';
import styles from './styles.module.scss';

const TwoColumnMediaSection: React.FC<ITwoColumnMediaSection> = props => {
  const { imageSideA, addButtonSideA, buttonSideA, imageSideB, addButtonSideB, buttonSideB, invertLayout, className } =
    props;

  const layoutVariant = invertLayout ? 'rightLargeFullWidth' : 'leftLargeFullWidth';

  const [sideAHover, setSideAHover] = useState(false);
  const [sideBHover, setSideBHover] = useState(false);

  return (
    <Section
      name="TwoColumnMediaSection"
      theme="light-dark"
      full
      removeTopSpacing
      removeBottomSpacing
      className={className}
    >
      <Layout variant={layoutVariant} className={styles.container}>
        <div className={classNames(styles.sideA, { [styles.hover]: sideAHover })}>
          <Image {...imageSideA} key="imageSideA" className={styles.image} />
          {addButtonSideA && buttonSideA?.link && (
            <div className={styles.buttonContainer}>
              <div
                className={styles.button}
                onMouseOver={() => setSideAHover(true)}
                onMouseLeave={() => setSideAHover(false)}
              >
                <Link {...buttonSideA?.link} variant="square-overlay-light" text={buttonSideA?.label} />
              </div>
            </div>
          )}
        </div>

        <div className={classNames(styles.sideB, { [styles.hover]: sideBHover })}>
          <div onMouseOver={() => setSideBHover(true)} onMouseLeave={() => setSideBHover(false)}>
            {addButtonSideB && buttonSideB?.link ? (
              <Link {...buttonSideB?.link} variant="content">
                <Image {...imageSideB} key="imageSideB" className={styles.image} />
              </Link>
            ) : (
              <Image {...imageSideB} key="imageSideB" className={styles.image} />
            )}
          </div>
          {addButtonSideB && (
            <div onMouseOver={() => setSideBHover(true)} onMouseLeave={() => setSideBHover(false)}>
              <Link {...buttonSideB?.link} className={styles.button} variant="normal-sm" text={buttonSideB?.label} />
            </div>
          )}
        </div>
      </Layout>
    </Section>
  );
};

export default TwoColumnMediaSection;
