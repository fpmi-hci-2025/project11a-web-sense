import { Button as MuiButton } from '@mui/material';
import styles from './button.module.css';
import '../../styles/typography.css';

interface MuiButtonProps {
  variant?: 'text' | 'filled';
  label: string;
  onClick?: () => void;
}

export const Button = ({
  variant = 'filled',
  label,
  onClick,
}: MuiButtonProps) => {
  return (
    <MuiButton
      onClick={onClick}
      className={`${styles.buttonBase} ${
        variant === 'filled' ? styles.filled : styles.text
      } sense-body-1`}
    >
      {label}
    </MuiButton>
  );
};
