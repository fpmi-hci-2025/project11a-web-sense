import { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import {
  Container,
  Typography,
  Box,
  TextField,
  Paper,
  IconButton,
  Toolbar,
  CircularProgress,
} from '@mui/material';
import { ArrowBack as ArrowBackIcon } from '@mui/icons-material';
import { usePublication } from '../../api/publication/usePublication';
import type { Publication } from '../../api/publication/types';
import { PublicationCard } from '../../components/publication/PublicationCard';
import { PageWrapper } from '../page-wrapper/page-wrapper';
import { Button } from '../../components/button';
import { type Comment } from '../../api/publication/types';

import styles from './publication-page.module.css';
import { Comments } from '../../components/comments/comments';

export const PublicationPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const {
    getPublication,
    getComments,
    loading: publicationLoading,
  } = usePublication();
  const [publication, setPublication] = useState<Publication | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [error, setError] = useState(false);
  const lastFetchedIdRef = useRef<string | null>(null);

  useEffect(() => {
    const fetchPublication = async () => {
      if (!id) return;

      if (lastFetchedIdRef.current !== id) {
        setPublication(null);
        setComments([]);
        setError(false);
        lastFetchedIdRef.current = null;
      }

      if (lastFetchedIdRef.current === id && publication) return;

      lastFetchedIdRef.current = id;

      try {
        const passedPublication = location.state?.publication as
          | Publication
          | undefined;

        let publicationData: Publication;

        if (passedPublication && passedPublication.id === id) {
          publicationData = passedPublication;
        } else {
          publicationData = await getPublication(id);
        }

        setPublication(publicationData);

        const commentsData = await getComments(id);

        if (commentsData) setComments(commentsData);
      } catch (err) {
        setError(true);
        throw err;
      }
    };

    fetchPublication();
  }, [id, getComments, getPublication, location.state, publication]);

  // const handleCreateComment = async () => {
  //   if (!id || !newComment.trim()) return;

  //   try {
  //     const comment = await createComment(id, newComment.trim());
  //     setComments(prev => [...prev, comment]);
  //     setNewComment('');
  //   } catch (err: any) {
  //     setError(err.message || 'Failed to create comment');
  //   }
  // };

  if (error) {
    return (
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Typography variant="h6" color="error">
          {error}
        </Typography>
      </Container>
    );
  }

  if (publicationLoading || !publication) {
    return (
      <PageWrapper>
        <div className={styles.container}>
          <div className={styles.loaderWrapper}>
            <div className={styles.loader} />
            <CircularProgress size={90} color="inherit" />
          </div>
        </div>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper>
      <div className={styles.container}>
        <Toolbar sx={{ width: '85vw' }}>
          <IconButton
            edge="start"
            color="inherit"
            onClick={() => navigate(-1)}
            sx={{ mr: 2 }}
          >
            <ArrowBackIcon />
          </IconButton>
        </Toolbar>

        <Container maxWidth="lg">
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              gap: 4,
              mx: 'auto',
            }}
          >
            <PublicationCard
              publication={publication}
              isFeed={false}
              isClickable={false}
              showActions={true}
            />

            <Box sx={{ maxWidth: '600px', mx: 'auto', width: '100%' }}>
              <Typography variant="h5" sx={{ mb: 4, fontWeight: '700' }}>
                Comments ({comments.length})
              </Typography>

              <Paper elevation={0} sx={{ p: 3, mb: 3, borderRadius: 5 }}>
                <Typography variant="h6" sx={{ mb: 2 }}>
                  Add a comment
                </Typography>
                <TextField
                  fullWidth
                  multiline
                  rows={3}
                  placeholder="Write your comment here..."
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  sx={{ mb: 2 }}
                />
                <Button
                  label={publicationLoading ? 'Posting...' : 'Post Comment'}
                />
              </Paper>

              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {comments.length === 0 ? (
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ textAlign: 'center', py: 4 }}
                  >
                    No comments yet. Be the first to comment!
                  </Typography>
                ) : (
                  <Comments
                    commentsResponse={comments}
                    loading={publicationLoading}
                  />
                )}
              </Box>
            </Box>
          </Box>
        </Container>
      </div>
    </PageWrapper>
  );
};
