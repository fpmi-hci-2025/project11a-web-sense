import { Chip } from '@mui/material';
import styles from './userBadge.module.css';
import type { Role } from '../../api/auth/types';

interface UserBadgeProps {
  role: Role;
}

export const UserBadge = ({ role }: UserBadgeProps) => {
  const roleClass =
    role === 'creator'
      ? styles.creator
      : role === 'expert'
      ? styles.expert
      : styles.user;

  const getRoleLabel = (role: Role): string => {
    return role.charAt(0).toUpperCase() + role.slice(1);
  };

  return (
    <Chip
      label={getRoleLabel(role)}
      size="small"
      className={`${styles.badge} ${roleClass}`}
    />
  );
};

