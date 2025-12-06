import { useEffect, useState } from 'react';
import { Typography } from '@mui/material';
import { Logo } from '../../components/logo';
import { FeedPage } from './feed-page';
import { useAuth } from '../../api/auth/useAuth';
import { PageWrapper } from '../page-wrapper/page-wrapper';

import styles from './home-page.module.css';
import PrivateRoute from '../../routes/PrivateRoute';

export const HomePage = () => {
  const { user } = useAuth();
  const [logoVisible, setLogoVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLogoVisible(true), 500);
    return () => clearTimeout(timer);
  }, []);

  if (user) {
    return (
      <PrivateRoute>
        <PageWrapper>
          <FeedPage />
        </PageWrapper>
      </PrivateRoute>
    );
  }

  return (
    <PageWrapper>
      <Logo
        size="large"
        className={`${styles.logo} ${logoVisible ? styles.loaded : ''}`}
      />

      <Typography variant="body1" className={styles.title}>
        Social network for sharing thoughts
      </Typography>
    </PageWrapper>
  );
};
