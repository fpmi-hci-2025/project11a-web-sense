import React from 'react';
import { PublicationCard } from '../../components/publication/PublicationCard';
import type { Publication } from '../../api/publication/types';

import styles from './search-feed.module.css';

interface SearchFeedProps {
  publications: Publication[];
  onUpdate?: (updatedItem: Publication) => void;
  onCommentClick?: (publicationId: string) => void;
}

export const SearchFeed: React.FC<SearchFeedProps> = ({
  publications,
  onUpdate,
  onCommentClick,
}) => {
  if (!publications.length) {
    return (
      <div
        style={{ textAlign: 'center', marginTop: 32 }}
        className={styles.text}
      >
        No results found.
      </div>
    );
  }
  return (
    <div>
      {publications.map((item) => (
        <PublicationCard
          key={item.id}
          isFeed
          publication={item}
          onUpdate={onUpdate}
          onCommentClick={onCommentClick}
        />
      ))}
    </div>
  );
};
