import React from 'react';
import { IconButton } from '@mui/material';
import { Bolt } from '@mui/icons-material';
import styles from './ai-button.module.css';
import { useAuth } from '../../api/auth/useAuth';

const AiButton: React.FC = () => {
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
    >
      <Bolt className={styles.icon} />
    </IconButton>
  );
};

export default AiButton;
