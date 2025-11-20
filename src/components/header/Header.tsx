import { Avatar } from '../avatar/Avatar';
import styles from './header.module.css';
import { Logo } from '../logo';
import clsx from 'clsx';
import { Button } from '../button';

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
  return (
    <header className={clsx(styles['sense-header'], className)}>
      <div className={styles['sense-header-container']}>
        {showLogo && <Logo size={logoSize} onClick={onLogoClick} />}
        <div className={styles['sense-header-actions']}>
          {showLoginButton && <Button label="Login" variant="filled" />}
          {showAvatar && (
            <Avatar
              src={avatarSrc}
              alt={avatarAlt}
              initials={avatarInitials}
              size={avatarSize}
              onClick={onAvatarClick}
              clickable={true}
            />
          )}
        </div>
      </div>
    </header>
  );
};
