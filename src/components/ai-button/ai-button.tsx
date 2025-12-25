import React from 'react';
import { IconButton, CircularProgress } from '@mui/material';
import { Bolt } from '@mui/icons-material';
import styles from './ai-button.module.css';
import { useAuth } from '../../api/auth/useAuth';

interface AiButtonProps {
  loading?: boolean;
}

const AiButton: React.FC<AiButtonProps> = ({ loading = false }) => {
  const { user } = useAuth();

  const roleClass =
    user?.role === 'creator'
      ? styles.creator
      : user?.role === 'expert'
        ? styles.expert
        : styles.user;

  return (
    <IconButton
      className={`${styles['ai-button']} ${roleClass}`}
      size="large"
      aria-label="ai"
      disabled={loading}
    >
      {loading ? (
        <CircularProgress size={24} />
      ) : (
        <Bolt className={styles.icon} />
      )}
    </IconButton>
  );
};

export default AiButton;
