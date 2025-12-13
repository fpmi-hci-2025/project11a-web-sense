import { useNavigate } from 'react-router-dom';
import { Container, Box, IconButton, Toolbar } from '@mui/material';
import { ArrowBack as ArrowBackIcon } from '@mui/icons-material';
import { PageWrapper } from '../page-wrapper/page-wrapper';

import styles from './create-post-page.module.css';
import CreatePost from '../../components/create-post/create-post';

export const CreatePostPage = () => {
  const navigate = useNavigate();

  return (
    <PageWrapper>
      <div className={styles.container}>
        <Toolbar className={styles.toolbar}>
          <IconButton
            edge="start"
            color="inherit"
            onClick={() => navigate(-1)}
            sx={{ mr: 2 }}
          >
            <ArrowBackIcon />
          </IconButton>
        </Toolbar>

        <Container maxWidth="lg">
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              gap: 4,
              mx: 'auto',
            }}
          >
            <CreatePost />
          </Box>
        </Container>
      </div>
    </PageWrapper>
  );
};
