import React from 'react';

import { Box, Stack, Typography } from '@mui/material';

import userImage1 from '../../assets/yuliaraitsyna.jpeg';
import userImage2 from '../../assets/tayadj.png';
import userImage3 from '../../assets/StanislauSenkevich.png';
import { Avatar } from '../avatar';

import styles from './footer.module.css';
import { Link } from '../link';

export interface FooterProps {
  children?: React.ReactNode;
  copyright?: string;
  links?: Array<{ label: string; href: string }>;
}

export const Footer = () => {
  return (
    <Box className={styles.footer}>
      <Typography
        variant="h4"
        sx={{ fontWeight: 'bold', px: { xs: 0, md: 4 } }}
        className={styles.logo}
      >
        Sense
      </Typography>

      <Stack
        direction={{ xs: 'column', md: 'row' }}
        sx={{ alignItems: 'center' }}
      >
        <Link href="/about">
          <Typography className={styles.link}>About</Typography>
        </Link>
        <Link href="/team">
          <Typography className={styles.link}>Team</Typography>
        </Link>
        <Link href="/settings">
          <Typography className={styles.link}>Settings</Typography>
        </Link>
        <Link href="/profile">
          <Typography className={styles.link}>Profile</Typography>
        </Link>
      </Stack>

      <Stack
        spacing={2}
        sx={{ alignItems: 'center', px: { xs: 0, md: 4 } }}
        className={styles['avatar-stack']}
      >
        <Stack direction="row" spacing={2}>
          <Avatar
            src={userImage1}
            alt="yuliaraitsyna"
            link="https://github.com/yuliaraitsyna"
          />
          <Avatar
            src={userImage2}
            alt="tayadj"
            link="https://github.com/tayadj"
          />
          <Avatar
            src={userImage3}
            alt="StanislauSenkevich"
            link="https://github.com/Stanislau-Senkevich"
          />
        </Stack>

        <Typography
          sx={{
            fontSize: 14,
            opacity: 0.7,
          }}
        >
          @project11a-sense.github.io
        </Typography>
      </Stack>
    </Box>
  );
};
