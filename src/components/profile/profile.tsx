import { Box, Typography, Card } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import { useState } from 'react';

import { Avatar } from '../avatar/Avatar';
import { UserBadge } from '../user-badge';
import type { Role } from '../../api/auth/types';

import styles from './profile.module.css';

type TabType = 'publications' | 'saved';

export interface ProfileProps {
  avatar?: string;
  username: string;
  bio?: string;
  role?: Role;
  showSavedTab?: boolean;
  onTabChange?: (tab: TabType) => void;
}

export const Profile = ({
  avatar,
  username,
  bio,
  role = 'User',
  showSavedTab = false,
  onTabChange,
}: ProfileProps) => {
  const [selectedTab, setSelectedTab] = useState<TabType>('publications');

  const handleTabChange = (tab: TabType) => {
    setSelectedTab(tab);
    onTabChange?.(tab);
  };

  const roleClass = styles[role.toLowerCase()] ?? '';

  return (
    <Card className={styles.profileCard}>
      <div className={styles.profileContent}>
        <Avatar
          src={avatar}
          alt={username}
          initials={username[0]?.toUpperCase()}
          size="large"
          clickable={false}
        />

        <div className={styles.userInfo}>
          <Typography variant="h4" fontWeight={700}>
            {username}
          </Typography>

          {bio && (
            <Typography color="text.secondary" className={styles.bio}>
              {bio}
            </Typography>
          )}
        </div>

        <UserBadge role={role} />
      </div>

      <Box className={styles.tabs}>
        <button
          className={`${styles.tab} ${
            selectedTab === 'publications' ? styles.active : ''
          } ${roleClass}`}
          onClick={() => handleTabChange('publications')}
        >
          <StarIcon fontSize="large" />
        </button>

        {showSavedTab && (
          <button
            className={`${styles.tab} ${
              selectedTab === 'saved' ? styles.active : ''
            } ${roleClass}`}
            onClick={() => handleTabChange('saved')}
          >
            <BookmarkIcon fontSize="large" />
          </button>
        )}
      </Box>
    </Card>
  );
};
