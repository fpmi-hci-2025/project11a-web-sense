import { ThemeToggle } from '../../components/theme-toggle';
import { PageWrapper } from '../page-wrapper/page-wrapper';
import { Box, IconButton, Toolbar, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';

import styles from './settings-page.module.css';

export const SettingsPage = () => {
  const navigate = useNavigate();

  return (
    <PageWrapper>
      <Toolbar sx={{ width: '85vw' }}>
        <IconButton
          edge="start"
          color="inherit"
          onClick={() => navigate(-1)}
          sx={{ mr: 2 }}
        >
          <ArrowBackIcon className={styles.icon} />
        </IconButton>
        <Typography
          className={styles.text}
          variant="h2"
          component="div"
          sx={{ ml: 1 }}
        >
          Settings
        </Typography>
      </Toolbar>
      <Box
        width="80%"
        display="flex"
        flexDirection="row"
        justifyContent="left"
        alignItems="center"
        gap={2}
        mt={4}
        ml={2}
      >
        <Typography
          className={styles.text}
          variant="h4"
          component="h1"
          sx={{ marginLeft: 1 }}
        >
          Theme
        </Typography>
        <ThemeToggle />
      </Box>
    </PageWrapper>
  );
};
