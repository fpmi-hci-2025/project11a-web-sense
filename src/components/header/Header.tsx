import { useNavigate } from 'react-router-dom';
import { Avatar } from '../avatar/Avatar';
import styles from './header.module.css';
import { Logo } from '../logo';
import clsx from 'clsx';
import { Button } from '../button';
import { useAuth } from '../../api/auth/useAuth';

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
}

export const Header = ({
  avatarSrc,
  avatarAlt = 'User avatar',
  avatarInitials,
  onAvatarClick,
  onLogoClick,
  className = '',
  showAvatar = true,
  showLogo = true,
  showLoginButton = true,
  avatarSize = 'medium',
  logoSize = 'medium',
}: HeaderProps) => {
  const navigate = useNavigate();
  const { user } = useAuth();

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

  const finalAvatarSrc = avatarSrc || user?.iconUrl;
  const finalAvatarInitials = avatarInitials || (user?.username ? user.username.charAt(0).toUpperCase() : undefined);

  return (
    <header className={clsx(styles['sense-header'], className)}>
      <div className={styles['sense-header-container']}>
        {showLogo && (
          <Logo
            size={logoSize}
            onClick={handleLogoClick}
            clickable={true}
          />
        )}
        <div className={styles['sense-header-actions']}>
          {showLoginButton && !user && (
            <Button
              label="Login"
              variant="filled"
              onClick={handleLoginClick}
            />
          )}
          {showAvatar && (
            <Avatar
              src={finalAvatarSrc}
              alt={avatarAlt}
              initials={finalAvatarInitials}
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
