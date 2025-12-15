import { Box, Paper, Typography, CircularProgress } from '@mui/material';
import { Avatar } from '../../components/avatar';
import { UserBadge } from '../../components/user-badge';
import { type Comment } from '../../api/publication/types';

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
        variant="body2"
        color="text.secondary"
        sx={{ textAlign: 'center', py: 4 }}
      >
        No comments yet. Be the first to comment!
      </Typography>
    );
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      {comments.map((comment) => (
        <Paper key={comment.id} elevation={0} sx={{ p: 3, borderRadius: 5 }}>
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
                <Typography variant="subtitle2" fontWeight="700">
                  {comment.author?.username}
                </Typography>
                <UserBadge role={comment.author?.role || 'User'} />
                <Typography variant="caption" color="text.secondary">
                  {new Date(comment.createdAt).toLocaleDateString()}
                </Typography>
              </Box>
              <Typography variant="body1" sx={{ mb: 1 }}>
                {comment.text}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {comment.likesCount} likes
              </Typography>
            </Box>
          </Box>
        </Paper>
      ))}
    </Box>
  );
};
