import { Container, Typography, Box, Card, CardContent } from '@mui/material';
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

export const TeamPage = () => {
  return (
    <PageWrapper>
      <Container maxWidth="lg" sx={{ py: 6 }}>
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
      </Container>
    </PageWrapper>
  );
};
