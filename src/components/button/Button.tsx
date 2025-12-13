import { Button as MuiButton } from '@mui/material';
import styles from './button.module.css';
import '../../styles/typography.css';

interface MuiButtonProps {
  variant?: 'text' | 'filled';
  label: string;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  children?: React.ReactNode;
}

export const Button = ({
  variant = 'filled',
  label,
  onClick,
  type = 'button',
  disabled = false,
  children,
}: MuiButtonProps) => {
  return (
    <MuiButton
      onClick={onClick}
      type={type}
      disabled={disabled}
      className={`${styles.buttonBase} ${
        variant === 'filled' ? styles.filled : styles.text
      } sense-body-1`}
    >
      {label}
      {children}
    </MuiButton>
  );
};
