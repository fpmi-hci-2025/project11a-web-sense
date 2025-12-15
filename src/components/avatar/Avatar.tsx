import MuiAvatar from '@mui/material/Avatar';
import styles from './avatar.module.css';

export interface AvatarProps {
  src?: string;
  alt?: string;
  link?: string;
  size?: 'small' | 'medium' | 'large';
  initials?: string;
  clickable?: boolean;
  onClick?: () => void;
}

const sizeMapping = {
  small: 30,
  medium: 40,
  large: 90,
};

export const Avatar = ({
  src,
  alt,
  size = 'medium',
  link,
  initials,
  clickable = false,
  onClick,
}: AvatarProps) => {
  const avatarSize = sizeMapping[size];

  const Wrapper = link ? 'a' : 'span';

  const shouldShowInitials = !src && initials;
  const shouldShowDefault = !src && !initials;

  return (
    <Wrapper
      href={link}
      onClick={clickable && onClick ? onClick : undefined}
      className={clickable ? styles['avatar-clickable'] : undefined}
      style={{ display: 'inline-block' }}
    >
      <MuiAvatar
        src={src}
        alt={alt || 'Avatar'}
        sx={{
          width: avatarSize,
          height: avatarSize,
          fontSize: avatarSize / 2.5,
          bgcolor: shouldShowDefault ? 'grey.400' : undefined,
        }}
      >
        {shouldShowInitials && initials!.toUpperCase()}
      </MuiAvatar>
    </Wrapper>
  );
};
