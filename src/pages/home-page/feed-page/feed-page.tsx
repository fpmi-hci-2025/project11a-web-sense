import { useEffect, useState, useCallback } from 'react';
import { useFeed } from '../../../api/feed/useFeed';
import { PublicationCard } from '../../../components/publication/PublicationCard';
import styles from './feed-page.module.css';
import type { Publication } from '../../../api/publication/types';
import { useNavigate } from 'react-router-dom';
import { CircularProgress, Box } from '@mui/material';

const PAGE_SIZE = 10;

export const FeedPage = () => {
  const { getFeed, loading } = useFeed();
  const navigate = useNavigate();

  const [publications, setPublications] = useState<Publication[]>([]);
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);

  useEffect(() => {
    const loadInitialFeed = async () => {
      try {
        const feed = await getFeed(PAGE_SIZE, 0);
        setPublications(feed.items);
        setHasMore(feed.items.length === PAGE_SIZE);
        setOffset(PAGE_SIZE);
      } catch (err) {
        console.error('Failed to load feed:', err);
      } finally {
        setInitialLoading(false);
      }
    };

    loadInitialFeed();
  }, []);

  const loadMorePublications = useCallback(async () => {
    if (isLoadingMore || !hasMore || loading) return;

    setIsLoadingMore(true);
    try {
      const feed = await getFeed(PAGE_SIZE, offset);
      if (feed.items.length > 0) {
        setPublications(prev => [...prev, ...feed.items]);
        setOffset(prev => prev + PAGE_SIZE);
        setHasMore(feed.items.length === PAGE_SIZE);
      } else {
        setHasMore(false);
      }
    } catch (err) {
      console.error('Failed to load more publications:', err);
    } finally {
      setIsLoadingMore(false);
    }
  }, [offset, isLoadingMore, hasMore, loading, getFeed]);

  const handleScroll = useCallback(() => {
    const scrollTop = window.scrollY;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;

    if (documentHeight - (scrollTop + windowHeight) < 200) {
      loadMorePublications();
    }
  }, [loadMorePublications]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  const handlePublicationUpdate = (updatedItem: Publication) => {
    setPublications((prev) =>
      prev?.map((item) => (item.id === updatedItem.id ? updatedItem : item))
    );
  };

  const handleCommentClick = (publicationId: string) => navigate(`/publication/${publicationId}`);

  if (initialLoading) {
    return (
      <div className={styles.container}>
        <div className={styles.loaderWrapper}>
          <div className={styles.loader} />
          <CircularProgress size={90} color="inherit" />
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.feed}>
        {publications.length === 0 ? (
          <div className={styles.empty}>Feed is empty</div>
        ) : (
          <>
            {publications.map((item) => (
              <PublicationCard
                key={item.id}
                isFeed={true}
                publication={item}
                onUpdate={handlePublicationUpdate}
                onCommentClick={handleCommentClick}
              />
            ))}

            {isLoadingMore && (
              <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
                <CircularProgress size={40} />
              </Box>
            )}

            {!hasMore && publications.length > 0 && (
              <Box sx={{ textAlign: 'center', py: 4, color: 'text.secondary' }}>
                You've reached the end of the feed
              </Box>
            )}
          </>
        )}
      </div>
    </div>
  );
};

