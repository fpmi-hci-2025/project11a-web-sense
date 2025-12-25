import { useNavigate } from 'react-router-dom';
import { Avatar } from '../avatar/Avatar';
import styles from './header.module.css';
import { Logo } from '../logo';
import clsx from 'clsx';
import { Button } from '../button';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';

export interface HeaderProps {
  avatarSrc?: string;
  avatarAlt?: string;
  avatarInitials?: string;
  onAvatarClick?: () => void;
  onLogoClick?: () => void;
  avatarSize?: 'small' | 'medium' | 'large';
  logoSize?: 'small' | 'medium' | 'large';
  className?: string;
  showAvatar?: boolean;
  showLoginButton?: boolean;
  showLogo?: boolean;
  showSearch?: boolean;
}

export const Header = ({
  avatarSrc,
  avatarAlt = 'User avatar',
  avatarInitials,
  onAvatarClick,
  onLogoClick,
  className = '',
  showSearch = true,
  showAvatar = true,
  showLogo = true,
  showLoginButton = true,
  avatarSize = 'medium',
  logoSize = 'medium',
}: HeaderProps) => {
  const navigate = useNavigate();

  const handleLogoClick = () => {
    if (onLogoClick) {
      onLogoClick();
    } else {
      navigate('/');
    }
  };

  const handleLoginClick = () => {
    navigate('/auth/login');
  };

  const handleAvatarClick = () => {
    if (onAvatarClick) {
      onAvatarClick();
    } else {
      navigate('/profile');
    }
  };

  const handleSearchClick = () => {
    navigate('/search');
  };

  return (
    <header className={clsx(styles['sense-header'], className)}>
      <div className={styles['sense-header-container']}>
        {showLogo && (
          <Logo size={logoSize} onClick={handleLogoClick} clickable={true} />
        )}
        <div className={styles['sense-header-actions']}>
          {showSearch && (
            <IconButton
              aria-label="search"
              onClick={handleSearchClick}
              size="large"
            >
              <SearchIcon className={styles.icon} />
            </IconButton>
          )}
          {showLoginButton && (
            <Button label="Login" variant="filled" onClick={handleLoginClick} />
          )}
          {showAvatar && (
            <Avatar
              src={avatarSrc}
              alt={avatarAlt}
              initials={avatarInitials}
              size={avatarSize}
              onClick={handleAvatarClick}
              clickable={true}
            />
          )}
        </div>
      </div>
    </header>
  );
};
