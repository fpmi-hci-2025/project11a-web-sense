import { Container, Typography, Box, Paper } from '@mui/material';
import { PageWrapper } from '../page-wrapper/page-wrapper';

export const AboutPage = () => {
  return (
    <PageWrapper>
      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Box sx={{ textAlign: 'center', mb: 8 }}>
          <Typography
            variant="h2"
            component="h1"
            sx={{
              fontWeight: 700,
              mb: 3,
              background: 'linear-gradient(45deg, #bb21f3ff 30%, #21CBF3 90%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            About Sense
          </Typography>
          <Typography
            variant="h5"
            sx={{
              maxWidth: '800px',
              mx: 'auto',
              mb: 4,
              color: 'text.secondary',
              lineHeight: 1.6,
            }}
          >
            Sense is a modern social network designed for sharing thoughts,
            ideas, and inspiration. Connect with like-minded people, discover
            new perspectives, and build meaningful conversations in a space that
            values authenticity and creativity.
          </Typography>
          <Typography
            variant="body1"
            sx={{
              maxWidth: '600px',
              mx: 'auto',
              color: 'text.secondary',
              fontSize: '1.1rem',
            }}
          >
            Whether you're a writer, artist, entrepreneur, or simply someone
            with thoughts to share, Sense provides the perfect platform to
            express yourself and connect with others who share your passion.
          </Typography>
        </Box>

        <Box sx={{ textAlign: 'center', py: 6 }}>
          <Paper
            elevation={2}
            sx={{
              p: 4,
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: 'white',
              borderRadius: 3,
            }}
          >
            <Typography variant="h4" sx={{ mb: 2, fontWeight: 600 }}>
              Our Mission
            </Typography>
            <Typography
              variant="body1"
              sx={{ fontSize: '1.1rem', lineHeight: 1.7 }}
            >
              To create a vibrant community where every voice matters, every
              thought is valued, and every connection has the potential to
              inspire change. Sense is more than just a social network—it's a
              movement towards more meaningful digital interactions.
            </Typography>
          </Paper>
        </Box>
      </Container>
    </PageWrapper>
  );
};
