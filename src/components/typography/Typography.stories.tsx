import type { Meta, StoryObj } from '@storybook/react-vite';
import Typography from '@mui/material/Typography';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { createMUITheme } from '../../styles/theme';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';

import './typography.css';

const meta = {
  title: 'Design System/Typography',
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <ThemeProvider theme={createMUITheme('light')}>
        <CssBaseline />
        <Story />
      </ThemeProvider>
    ),
  ],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const SenseTypography: Story = {
  render: () => (
    <Box className="typography-page">
      <Typography variant="h1" component="h1" gutterBottom>
        Sense Typography System
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        Based on the Sense Style Guide from Figma - Using MUI Typography
      </Typography>

      <Box component="section" sx={{ mb: 4 }}>
        <Typography variant="h2" component="h2" gutterBottom>
          Desktop Typography
        </Typography>
        <Box className="typography-section">
          <Box sx={{ mb: 3 }}>
            <Typography variant="h1" component="h1">
              Heading 1
            </Typography>
            <Typography
              variant="caption"
              color="text.secondary"
              sx={{ mt: 1, display: 'block' }}
            >
              48px / 52px line-height, Bold (Desktop) | 40px / 44px (Mobile)
            </Typography>
          </Box>

          <Box sx={{ mb: 3 }}>
            <Typography variant="h2" component="h2">
              Heading 2
            </Typography>
            <Typography
              variant="caption"
              color="text.secondary"
              sx={{ mt: 1, display: 'block' }}
            >
              40px / 48px line-height, Bold (Desktop) | 36px / 40px (Mobile)
            </Typography>
          </Box>

          <Box sx={{ mb: 3 }}>
            <Typography variant="h3" component="h3">
              Heading 3
            </Typography>
            <Typography
              variant="caption"
              color="text.secondary"
              sx={{ mt: 1, display: 'block' }}
            >
              36px / 40px line-height, Bold (Desktop) | 30px / 34px (Mobile)
            </Typography>
          </Box>

          <Box sx={{ mb: 3 }}>
            <Typography variant="h4" component="p">
              Description Text (h4 variant - 24px / 28px)
            </Typography>
            <Typography
              variant="caption"
              color="text.secondary"
              sx={{ mt: 1, display: 'block' }}
            >
              24px / 28px line-height (Desktop) | 20px / 24px (Mobile)
            </Typography>
          </Box>

          <Box sx={{ mb: 3 }}>
            <Typography variant="body1">
              Body 1 - This is body text at 20px with 24px line height.
            </Typography>
            <Typography
              variant="caption"
              color="text.secondary"
              sx={{ mt: 1, display: 'block' }}
            >
              20px / 24px line-height (Desktop) | 16px / 20px (Mobile)
            </Typography>
          </Box>

          <Box sx={{ mb: 3 }}>
            <Typography variant="body2">
              Body 2 - This is smaller body text at 16px with 20px line height.
            </Typography>
            <Typography
              variant="caption"
              color="text.secondary"
              sx={{ mt: 1, display: 'block' }}
            >
              16px / 20px line-height (Desktop) | 12px / 16px (Mobile)
            </Typography>
          </Box>

          <Box sx={{ mb: 3 }}>
            <Typography variant="caption">
              Caption - Small text for captions and labels
            </Typography>
            <Typography
              variant="caption"
              color="text.secondary"
              sx={{ mt: 1, display: 'block' }}
            >
              12px / 16px line-height (Desktop) | 8px / 10px (Mobile)
            </Typography>
          </Box>
        </Box>
      </Box>

      <Box component="section" sx={{ mb: 4 }}>
        <Typography variant="h2" component="h2" gutterBottom>
          Font Weights
        </Typography>
        <Box className="typography-section">
          <Typography variant="body1" fontWeight={700}>
            Bold (700)
          </Typography>
          <Typography variant="body1" fontWeight={500}>
            Medium (500)
          </Typography>
          <Typography variant="body1" fontWeight={400}>
            Regular (400)
          </Typography>
          <Typography variant="body1" fontWeight={300}>
            Light (300)
          </Typography>
        </Box>
      </Box>

      <Box component="section" sx={{ mb: 4 }}>
        <Typography variant="h2" component="h2" gutterBottom>
          Responsive Typography
        </Typography>
        <Box className="typography-section">
          <Typography variant="body2" color="text.secondary">
            Typography automatically adjusts for mobile devices. Resize your
            browser to see the changes.
          </Typography>
          <Paper sx={{ mt: 2, p: 2 }}>
            <Typography variant="body2" sx={{ mb: 1 }}>
              <strong>Desktop:</strong> Larger font sizes (48px, 40px, 36px for
              headings)
            </Typography>
            <Typography variant="body2">
              <strong>Mobile:</strong> Smaller font sizes (40px, 36px, 30px for
              headings)
            </Typography>
          </Paper>
        </Box>
      </Box>
    </Box>
  ),
};
