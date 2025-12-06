import { useEffect, useState, useCallback } from 'react';
import { Typography } from '@mui/material';
import { Logo } from '../../components/logo';
import { FeedPage } from './feed-page';
import { useAuth } from '../../api/auth/useAuth';
import { PageWrapper } from '../page-wrapper/page-wrapper';

import styles from './home-page.module.css';

export const HomePage = () => {
  const [loaded, setLoaded] = useState(false);
  const [isFeedLoading, setIsFeedLoading] = useState(false);
  const [isFeedError, setIsFeedError] = useState(false);
  const { user, loading } = useAuth();

  useEffect(() => {
    setTimeout(() => setLoaded(true), 500);
  }, []);

  const handleFeedLoading = useCallback((feedLoading: boolean) => {
    setIsFeedLoading(feedLoading);
  }, []);

  const handleFeedError = useCallback((feedError: boolean) => {
    setIsFeedError(feedError);
  }, []);

  return (
    <PageWrapper isLoading={loading || !loaded || isFeedLoading} isError={isFeedError}>
      {
        user ? <FeedPage onLoading={handleFeedLoading} onError={handleFeedError} /> :
        <>
          <Logo
            size="large"
            className={`${styles.logo} ${loaded ? styles.loaded : ''}`}
          />
          <Typography variant="body1" className={styles.title}>
            Social network for sharing thoughts
          </Typography>
        </>
      }

    </PageWrapper>
  );
};
