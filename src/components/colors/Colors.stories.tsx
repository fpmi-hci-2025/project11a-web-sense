import type { Meta, StoryObj } from '@storybook/react-vite';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import { createMUITheme } from '../../styles/theme';

import '../../styles/theme.css';
import './colors.css';

const meta = {
  title: 'Design System/Colors',
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

const ColorSwatch = ({
  name,
  color,
  textColor = '#000',
}: {
  name: string;
  color: string;
  textColor?: string;
}) => (
  <div className="color-swatch">
    <div
      className="color-box"
      style={{ backgroundColor: color, color: textColor }}
    >
      {color}
    </div>
    <div className="color-name">{name}</div>
  </div>
);

const ColorsPage = ({ mode }: { mode: 'light' | 'dark' }) => {
  const theme = createMUITheme(mode);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div
        className="colors-page"
        style={{
          backgroundColor: theme.palette.background.default,
          color: theme.palette.text.primary,
        }}
      >
        <Typography variant="h1" component="h1" gutterBottom>
          Color Palette
        </Typography>
        <Typography variant="body1" paragraph>
          This page displays the Material-UI theme colors that can be customized
          via CSS variables.
        </Typography>

        <section>
          <Typography variant="h2" component="h2" gutterBottom>
            Sense Brand Colors
          </Typography>
          <div className="color-grid">
            <ColorSwatch
              name="Creator Color"
              color={
                typeof window !== 'undefined'
                  ? getComputedStyle(document.documentElement)
                      .getPropertyValue('--sense-creator-color')
                      .trim() || '#555ab9'
                  : '#555ab9'
              }
              textColor="#fff"
            />
            <ColorSwatch
              name="Creator Gradient"
              color={
                typeof window !== 'undefined'
                  ? getComputedStyle(document.documentElement)
                      .getPropertyValue('--sense-creator-gradient')
                      .trim() || '#7d82c7'
                  : '#7d82c7'
              }
              textColor="#fff"
            />
            <ColorSwatch
              name="Expert Color"
              color={
                typeof window !== 'undefined'
                  ? getComputedStyle(document.documentElement)
                      .getPropertyValue('--sense-expert-color')
                      .trim() || '#91baf8'
                  : '#91baf8'
              }
              textColor="#fff"
            />
            <ColorSwatch
              name="Expert Gradient"
              color={
                typeof window !== 'undefined'
                  ? getComputedStyle(document.documentElement)
                      .getPropertyValue('--sense-expert-gradient')
                      .trim() || '#91baf8'
                  : '#91baf8'
              }
              textColor="#fff"
            />
            <ColorSwatch
              name="User Color"
              color={
                typeof window !== 'undefined'
                  ? getComputedStyle(document.documentElement)
                      .getPropertyValue('--sense-user-color')
                      .trim() || '#9e9e9e'
                  : '#9e9e9e'
              }
              textColor="#fff"
            />
            <ColorSwatch
              name="User Gradient"
              color={
                typeof window !== 'undefined'
                  ? getComputedStyle(document.documentElement)
                      .getPropertyValue('--sense-user-gradient')
                      .trim() || '#9e9e9e'
                  : '#9e9e9e'
              }
              textColor="#fff"
            />
            <ColorSwatch
              name="Button BG Color"
              color={
                typeof window !== 'undefined'
                  ? getComputedStyle(document.documentElement)
                      .getPropertyValue('--sense-button-bg-color')
                      .trim() || '#555ab9'
                  : '#555ab9'
              }
              textColor="#fff"
            />
            <ColorSwatch
              name="Button Text Color"
              color={
                typeof window !== 'undefined'
                  ? getComputedStyle(document.documentElement)
                      .getPropertyValue('--sense-button-text-color')
                      .trim() || '#ffffff'
                  : '#ffffff'
              }
              textColor="#000"
            />
          </div>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
            Note: These colors are placeholders. Update the actual hex values in{' '}
            <code>src/styles/theme.css</code> from your Figma Style Guide.
          </Typography>
        </section>

        <section>
          <Typography variant="h2" component="h2" gutterBottom>
            Semantic Colors
          </Typography>
          <div className="color-grid">
            <ColorSwatch
              name="Error"
              color={theme.palette.error.main}
              textColor={theme.palette.error.contrastText}
            />
            <ColorSwatch
              name="Warning"
              color={theme.palette.warning.main}
              textColor={theme.palette.warning.contrastText}
            />
            <ColorSwatch
              name="Info"
              color={theme.palette.info.main}
              textColor={theme.palette.info.contrastText}
            />
            <ColorSwatch
              name="Success"
              color={theme.palette.success.main}
              textColor={theme.palette.success.contrastText}
            />
          </div>
        </section>

        <section>
          <Typography variant="h2" component="h2" gutterBottom>
            Grey Scale
          </Typography>
          <div className="color-grid">
            <ColorSwatch
              name="Grey 50"
              color={theme.palette.grey[50]}
              textColor={mode === 'dark' ? '#fff' : '#000'}
            />
            <ColorSwatch
              name="Grey 100"
              color={theme.palette.grey[100]}
              textColor={mode === 'dark' ? '#fff' : '#000'}
            />
            <ColorSwatch
              name="Grey 200"
              color={theme.palette.grey[200]}
              textColor={mode === 'dark' ? '#fff' : '#000'}
            />
            <ColorSwatch
              name="Grey 300"
              color={theme.palette.grey[300]}
              textColor={mode === 'dark' ? '#fff' : '#000'}
            />
            <ColorSwatch
              name="Grey 400"
              color={theme.palette.grey[400]}
              textColor={mode === 'dark' ? '#fff' : '#000'}
            />
            <ColorSwatch
              name="Grey 500"
              color={theme.palette.grey[500]}
              textColor={mode === 'dark' ? '#fff' : '#000'}
            />
            <ColorSwatch
              name="Grey 600"
              color={theme.palette.grey[600]}
              textColor={mode === 'light' ? '#fff' : '#000'}
            />
            <ColorSwatch
              name="Grey 700"
              color={theme.palette.grey[700]}
              textColor={mode === 'light' ? '#fff' : '#000'}
            />
            <ColorSwatch
              name="Grey 800"
              color={theme.palette.grey[800]}
              textColor={mode === 'light' ? '#fff' : '#000'}
            />
            <ColorSwatch
              name="Grey 900"
              color={theme.palette.grey[900]}
              textColor={mode === 'light' ? '#fff' : '#000'}
            />
          </div>
        </section>

        <section>
          <Typography variant="h2" component="h2" gutterBottom>
            Background Colors
          </Typography>
          <div className="color-grid">
            <ColorSwatch
              name="Background Default"
              color={theme.palette.background.default}
              textColor={theme.palette.text.primary}
            />
            <ColorSwatch
              name="Background Paper"
              color={theme.palette.background.paper}
              textColor={theme.palette.text.primary}
            />
          </div>
        </section>

        <section>
          <Typography variant="h2" component="h2" gutterBottom>
            Text Colors
          </Typography>
          <div className="color-grid">
            <ColorSwatch
              name="Text Primary"
              color={theme.palette.text.primary}
              textColor={mode === 'dark' ? '#000' : '#fff'}
            />
            <ColorSwatch
              name="Text Secondary"
              color={theme.palette.text.secondary}
              textColor={mode === 'dark' ? '#000' : '#fff'}
            />
          </div>
        </section>
      </div>
    </ThemeProvider>
  );
};

export const LightTheme: Story = {
  render: () => <ColorsPage mode="light" />,
};

export const DarkTheme: Story = {
  render: () => <ColorsPage mode="dark" />,
};

export const ThemeSwitcher: Story = {
  render: () => {
    const [mode, setMode] = useState<'light' | 'dark'>('light');
    const theme = createMUITheme(mode);

    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div
          style={{
            padding: '20px',
            backgroundColor: theme.palette.background.default,
            minHeight: '100vh',
          }}
        >
          <div
            style={{
              marginBottom: '20px',
              display: 'flex',
              gap: '10px',
              alignItems: 'center',
            }}
          >
            <ButtonGroup variant="contained" aria-label="theme switcher">
              <Button
                variant={mode === 'light' ? 'contained' : 'outlined'}
                onClick={() => setMode('light')}
              >
                Light Theme
              </Button>
              <Button
                variant={mode === 'dark' ? 'contained' : 'outlined'}
                onClick={() => setMode('dark')}
              >
                Dark Theme
              </Button>
            </ButtonGroup>
          </div>
          <ColorsPage mode={mode} />
        </div>
      </ThemeProvider>
    );
  },
};
