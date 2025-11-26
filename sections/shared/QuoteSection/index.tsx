'use client';

import React from 'react';
import Section from '@/components/Section';
import TextBlock from '@/components/TextBlock';
import Image from '@/components/Image';
import { motion } from 'framer-motion';
import { IQuoteSection } from '@/tools/sanity/schema/sections/shared/quoteSection';
import classNames from '@/helpers/classNames';
import useHeaderTheme from '@/hooks/useHeaderTheme';
import styles from './styles.module.scss';

const QuoteSection: React.FC<IQuoteSection> = props => {
  const { content, className, theme = 'light', image } = props;

  const classes = classNames(styles.section, className, styles[`theme-${theme || 'light'}`]);

  const [sectionRef] = useHeaderTheme({ theme: theme === 'dark' ? 'light' : 'dark' });

  return (
    <Section
      name="QuoteSection"
      theme={theme === 'dark' ? 'light' : 'dark'}
      full
      removeTopSpacing
      removeBottomSpacing
      className={classes}
      ref={sectionRef}
    >
      <div className={styles.container}>
        {image && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            whileInView={{
              opacity: 1,
              y: 0,
              transition: {
                duration: 0.8,
                ease: 'easeOut'
              }
            }}
          >
            <Image {...image} className={styles.image} />
          </motion.div>
        )}

        <motion.div
          className={styles.contentContainer}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{
            opacity: 1,
            y: 0,
            transition: {
              duration: 0.8,
              ease: 'easeOut'
            }
          }}
          viewport={{
            once: true,
            margin: '-100px'
          }}
        >
          {content && (
            <TextBlock
              className={styles.content}
              blocks={content}
              color={theme === 'dark' ? 'brand-white' : undefined}
              config={{
                p: {
                  size: 'b1'
                }
              }}
            />
          )}
        </motion.div>
      </div>
    </Section>
  );
};

export default QuoteSection;
