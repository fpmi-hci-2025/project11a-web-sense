import Typography from '@mui/material/Typography';

import styles from './logo.module.css';

export interface LogoProps {
  size?: 'small' | 'medium' | 'large';
  onClick?: () => void;
  clickable?: boolean;
  className?: string;
}

export const Logo = ({
  size = 'medium',
  onClick,
  className,
  clickable = false,
}: LogoProps) => {
  const sizeClass = styles[`logo--${size}`];
  const clickableClass = clickable ? styles['logo--clickable'] : '';

  return (
    <div
      className={`${styles.logo} ${sizeClass} ${clickableClass} ${className || ''}`}
      onClick={onClick}
    >
      <Typography variant="h1" component="h1" className={styles['logo-text']}>
        Sense
      </Typography>
    </div>
  );
};
