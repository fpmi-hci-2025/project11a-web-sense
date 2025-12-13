import {
  Container,
  Typography,
  Box,
  Paper,
  Card,
  CardContent,
} from '@mui/material';
import { Avatar as CustomAvatar } from '../../components/avatar/Avatar';
import { PageWrapper } from '../page-wrapper/page-wrapper';
import Image1 from '../../assets/yuliaraitsyna.jpeg';
import Image2 from '../../assets/StanislauSenkevich.png';
import Image3 from '../../assets/tayadj.png';

const contributors = [
  {
    name: 'Yulia Raitsyna',
    role: 'Frontend Developer',
    avatar: Image1,
  },
  {
    name: 'Stanislau Senkevich',
    role: 'Backend Developer',
    avatar: Image2,
  },
  {
    name: 'Tayadj',
    role: 'AI Specialist',
    avatar: Image3,
  },
];

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

        <Box sx={{ mb: 6 }}>
          <Typography
            variant="h3"
            sx={{
              textAlign: 'center',
              mb: 4,
              fontWeight: 600,
              color: 'primary.main',
            }}
          >
            Meet Our Team
          </Typography>
          <Typography
            variant="body1"
            sx={{
              textAlign: 'center',
              mb: 6,
              color: 'text.secondary',
              maxWidth: '600px',
              mx: 'auto',
            }}
          >
            The talented individuals behind Sense, working together to create an
            amazing platform for sharing thoughts and building connections.
          </Typography>

          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: {
                xs: '1fr',
                sm: 'repeat(2, 1fr)',
                md: 'repeat(3, 1fr)',
              },
              gap: 4,
              justifyItems: 'center',
            }}
          >
            {contributors.map((contributor, index) => (
              <Card
                key={index}
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  p: 3,
                  maxWidth: '200px',
                  minWidth: '200px',
                  transition: 'transform 0.2s ease-in-out',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: (theme) => theme.shadows[8],
                  },
                }}
              >
                <Box sx={{ mb: 2 }}>
                  <CustomAvatar
                    src={contributor.avatar}
                    alt={contributor.name}
                    size="large"
                    clickable={false}
                  />
                </Box>
                <CardContent sx={{ textAlign: 'center', p: 0 }}>
                  <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                    {contributor.name}
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    {contributor.role}
                  </Typography>
                </CardContent>
              </Card>
            ))}
          </Box>
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
