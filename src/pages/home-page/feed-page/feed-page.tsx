import { useEffect, useState } from 'react';
import { useFeed } from '../../../api/feed/useFeed';
import { PublicationCard } from '../../../components/publication/PublicationCard';
import styles from './feed-page.module.css';
import type { Publication } from '../../../api/publication/types';
import { useNavigate } from 'react-router-dom';

interface FeedPageProps {
  onLoading: (loading: boolean) => void;
  onError: (error: boolean) => void;
}

export const FeedPage = ({ onLoading, onError }: FeedPageProps) => {
  const { getFeed, loading, error } = useFeed();
  const navigate = useNavigate();

  const [publications, setPublications] = useState<Publication[]>([]);

  useEffect(() => {
    const loadFeed = async () => {
      try {
        const feed = await getFeed();
        setPublications(feed.items);
      } catch (err) {
        console.error('Failed to load feed:', err);
      }
    };

    loadFeed();
  }, []);

  useEffect(() => {
    onLoading(loading);
  }, [loading, onLoading]);

  useEffect(() => {
    onError(!!error);
  }, [error, onError]);

  const handlePublicationUpdate = (updatedItem: Publication) => {
    setPublications((prev) =>
      prev.map((item) => (item.id === updatedItem.id ? updatedItem : item))
    );
  };

  const handleCommentClick = (publicationId: string) => navigate(`/publication/${publicationId}`);

  return (
    <div className={styles.container}>
      <div className={styles.feed}>
        {publications.length === 0 ? (
          <div className={styles.empty}>Лента пуста</div>
        ) : (
          publications.map((item) => (
            <PublicationCard
              key={item.id}
              isFeed={true}
              publication={item}
              onUpdate={handlePublicationUpdate}
              onCommentClick={handleCommentClick}
            />
          ))
        )}
      </div>
    </div>
  );
};

