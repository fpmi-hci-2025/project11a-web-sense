import {
  Container,
  Typography,
  Box,
  Alert,
  IconButton,
  CircularProgress,
} from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState, useCallback } from 'react';

import { PublicationCard } from '../../components/publication/PublicationCard';
import { PageWrapper } from '../page-wrapper/page-wrapper';

import { useAuth } from '../../api/auth/useAuth';
import { useFeed } from '../../api/feed/useFeed';
import { useProfile } from '../../api/profile/useProfile';

import type { Publication } from '../../api/publication/types';
import { Button } from '../../components/button';
import { ArrowBack as ArrowBackIcon } from '@mui/icons-material';

import styles from './profile-page.module.css';
import type { Profile as TProfile } from '../../api/profile/types';
import { Profile } from '../../components/profile';

const PAGE_SIZE = 5;

type TabType = 'publications' | 'saved';

export const ProfilePage = () => {
  const { id } = useParams<{ id?: string }>();
  const navigate = useNavigate();

  const { user } = useAuth();
  const {
    getMyPublications,
    getUserPublications,
    getSavedPublications,
    loading,
  } = useFeed();

  const {
    getMyProfile,
    getUserProfile,
    loading: profileLoading,
    error: profileError,
  } = useProfile();

  const isCurrentUser = !id || id === user?.username;

  const [profile, setProfile] = useState<TProfile | null>(null);

  const [tab, setTab] = useState<TabType>('publications');
  const [publications, setPublications] = useState<Publication[]>([]);
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const data = isCurrentUser
          ? await getMyProfile()
          : id
            ? await getUserProfile(id)
            : null;

        if (data) setProfile(data);
      } catch (e) {
        console.error(e);
      }
    };

    loadProfile();
  }, [getMyProfile, getUserProfile, id, isCurrentUser, user]);

  useEffect(() => {
    const loadInitialFeed = async () => {
      setInitialLoading(true);

      try {
        let data;

        if (tab === 'saved') {
          data = isCurrentUser
            ? await getSavedPublications(PAGE_SIZE, 0)
            : null;
        } else {
          data = isCurrentUser
            ? await getMyPublications(PAGE_SIZE, 0)
            : id
              ? await getUserPublications(id, PAGE_SIZE, 0)
              : null;
        }

        setPublications(data?.items ?? []);
        setHasMore((data?.items?.length ?? 0) === PAGE_SIZE);
        setOffset(PAGE_SIZE);
      } catch (e) {
        console.error('Failed to load publications', e);
      } finally {
        setInitialLoading(false);
      }
    };

    loadInitialFeed();
  }, [
    tab,
    id,
    user,
    isCurrentUser,
    getSavedPublications,
    getMyPublications,
    getUserPublications,
  ]);

  const loadMorePublications = useCallback(async () => {
    if (isLoadingMore || !hasMore || loading) return;

    setIsLoadingMore(true);

    try {
      let data;

      if (tab === 'saved') {
        data = isCurrentUser
          ? await getSavedPublications(PAGE_SIZE, offset)
          : null;
      } else {
        data = isCurrentUser
          ? await getMyPublications(PAGE_SIZE, offset)
          : id
            ? await getUserPublications(id, PAGE_SIZE, offset)
            : null;
      }

      if (data?.items?.length) {
        setPublications((prev) => [...prev, ...data.items]);
        setOffset((prev) => prev + PAGE_SIZE);
        setHasMore(data.items.length === PAGE_SIZE);
      } else {
        setHasMore(false);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoadingMore(false);
    }
  }, [
    isLoadingMore,
    hasMore,
    loading,
    tab,
    isCurrentUser,
    getSavedPublications,
    offset,
    getMyPublications,
    id,
    getUserPublications,
  ]);

  const handleShowMore = () => {
    loadMorePublications();
  };

  return (
    <PageWrapper>
      <Container sx={{ py: 4, width: '90vw' }}>
        {profileError && <Alert severity="error">{profileError}</Alert>}

        <Box sx={{ display: 'flex', mb: 2 }}>
          <IconButton
            edge="start"
            color="inherit"
            onClick={() => navigate(-1)}
            sx={{ mr: 2 }}
          >
            <ArrowBackIcon className={styles.icon} />
          </IconButton>

          {isCurrentUser && (
            <Box sx={{ ml: 'auto', display: 'flex', gap: 2 }}>
              <Button
                label="Create post"
                onClick={() => navigate('/create-post')}
              />
              <Button label="Settings" onClick={() => navigate('/settings')} />
            </Box>
          )}
        </Box>

        {profile ? (
          <Profile
            {...profile}
            username={profile.username || ''}
            showSavedTab={isCurrentUser}
            onTabChange={(t) => {
              setTab(t);
              setOffset(0);
              setPublications([]);
              setHasMore(true);
            }}
          />
        ) : profileLoading ? (
          <Typography align="center">Loading profile...</Typography>
        ) : (
          <Alert severity="warning">Profile not found</Alert>
        )}

        <div className={styles.feed}>
          {initialLoading ? (
            <Container
              sx={{ display: 'flex', justifyContent: 'center', py: 6 }}
            >
              <CircularProgress size={60} />
            </Container>
          ) : publications.length === 0 ? (
            <Typography align="center" color="text.secondary">
              No publications
            </Typography>
          ) : (
            <>
              {publications.map((item) => (
                <PublicationCard
                  key={item.id}
                  publication={item}
                  isFeed
                  showActions
                  onCommentClick={(id) => navigate(`/publication/${id}`)}
                />
              ))}

              {hasMore && !isLoadingMore && (
                <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
                  <Button
                    label={isLoadingMore ? 'Loading...' : 'Show More'}
                    onClick={handleShowMore}
                    variant="filled"
                    disabled={isLoadingMore}
                  />
                </Box>
              )}

              {isLoadingMore && (
                <Container
                  sx={{ display: 'flex', justifyContent: 'center', py: 4 }}
                >
                  <CircularProgress size={40} />
                </Container>
              )}

              {!hasMore && publications.length > 0 && (
                <Box
                  className={styles.text}
                  sx={{ textAlign: 'center', py: 4, color: 'text.secondary' }}
                >
                  You've reached the end
                </Box>
              )}
            </>
          )}
        </div>
      </Container>
    </PageWrapper>
  );
};
