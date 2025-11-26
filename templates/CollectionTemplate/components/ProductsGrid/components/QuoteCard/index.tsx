import React from 'react';
import TextBlock from '@/components/TextBlock';
import styles from './styles.module.scss';

type QuoteCardProps = {
  quote: any;
  className: string;
};

const QuoteCard: React.FC<QuoteCardProps> = props => {
  const { quote, className } = props;

  return (
    <div className={className}>
      <div className={styles.container}>
        <TextBlock
          className={styles.content}
          blocks={quote?.content}
          config={{
            p: {
              size: 'b1'
            }
          }}
        />
      </div>
    </div>
  );
};

export default QuoteCard;
