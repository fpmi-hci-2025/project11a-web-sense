import React from 'react';
import { Link as RouterLink } from 'react-router-dom';

import styles from './link.module.css';

export interface LinkProps {
  children: React.ReactNode;
  href: string;
  disabled?: boolean;
}

export const Link = ({ children, href, disabled = false }: LinkProps) => {
  if (disabled) return <></>;

  return (
    <RouterLink to={href} className={styles.link}>
      {children}
    </RouterLink>
  );
};
