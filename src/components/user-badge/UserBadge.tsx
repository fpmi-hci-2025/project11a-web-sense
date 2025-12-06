import { Chip } from '@mui/material';
import styles from './userBadge.module.css';

type UserRole = 'Creator' | 'User' | 'Expert';

interface UserBadgeProps {
  role: UserRole;
}

export const UserBadge = ({ role }: UserBadgeProps) => {
  const roleClass =
    role === 'Creator'
      ? styles.creator
      : role === 'Expert'
      ? styles.expert
      : styles.user;

  const getRoleLabel = (role: UserRole): string => {
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

