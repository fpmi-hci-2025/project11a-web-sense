import { Box, Paper, Typography, CircularProgress } from '@mui/material';
import { Avatar } from '../../components/avatar';
import { UserBadge } from '../../components/user-badge';
import { type Comment } from '../../api/publication/types';

import styles from './comments.module.css';

interface CommentsProps {
  commentsResponse: Comment[];
  loading?: boolean;
}

export const Comments = ({ commentsResponse, loading }: CommentsProps) => {
  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  const comments = commentsResponse;

  if (!comments || comments.length === 0) {
    return (
      <Typography
        className={styles.text}
        variant="body2"
        sx={{ textAlign: 'center', py: 4 }}
      >
        No comments yet. Be the first to comment!
      </Typography>
    );
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      {comments.map((comment) => (
        <Paper
          key={comment.id}
          elevation={0}
          sx={{ p: 3, borderRadius: 5 }}
          className={styles.card}
        >
          <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
            <Avatar
              src={comment.author?.iconUrl || ''}
              alt={comment.author?.username || 'User'}
              initials={comment.author?.username?.[0] || 'U'}
              size="small"
            />
            <Box sx={{ flex: 1 }}>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                  mb: 1,
                }}
              >
                <Typography
                  className={styles.text}
                  variant="subtitle2"
                  fontWeight="700"
                >
                  {comment.author?.username}
                </Typography>
                <UserBadge role={comment.author?.role || 'User'} />
                <Typography
                  className={styles.text}
                  variant="caption"
                  color="text.secondary"
                >
                  {new Date(comment.createdAt).toLocaleDateString()}
                </Typography>
              </Box>
              <Typography
                className={styles.text}
                variant="body1"
                sx={{ mb: 1 }}
              >
                {comment.text}
              </Typography>
            </Box>
          </Box>
        </Paper>
      ))}
    </Box>
  );
};
