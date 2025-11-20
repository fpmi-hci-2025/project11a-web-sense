import { createTheme } from '@mui/material/styles';
import type { Theme } from '@mui/material/styles';

const getCSSVariable = (variableName: string): string => {
  if (typeof window === 'undefined') {
    return '';
  }
  return getComputedStyle(document.documentElement)
    .getPropertyValue(variableName)
    .trim();
};

export const createMUITheme = (mode: 'light' | 'dark' = 'light'): Theme => {
  if (typeof document !== 'undefined') {
    document.documentElement.setAttribute('data-theme', mode);
  }

  return createTheme({
    palette: {
      mode,
      primary: {
        main: getCSSVariable('--mui-primary-main') || '#555ab9',
        light: getCSSVariable('--mui-primary-light') || '#7d82c7',
        dark: getCSSVariable('--mui-primary-dark') || '#3d4299',
        contrastText: getCSSVariable('--mui-primary-contrast') || '#ffffff',
      },
      secondary: {
        main: getCSSVariable('--mui-secondary-main') || '#91baf8',
        light: getCSSVariable('--mui-secondary-light') || '#b3d4ff',
        dark: getCSSVariable('--mui-secondary-dark') || '#6a9ae5',
        contrastText: getCSSVariable('--mui-secondary-contrast') || '#ffffff',
      },
      error: {
        main: getCSSVariable('--mui-error-main') || '#d32f2f',
        light: getCSSVariable('--mui-error-light') || '#ef5350',
        dark: getCSSVariable('--mui-error-dark') || '#c62828',
        contrastText: getCSSVariable('--mui-error-contrast') || '#ffffff',
      },
      warning: {
        main: getCSSVariable('--mui-warning-main') || '#ed6c02',
        light: getCSSVariable('--mui-warning-light') || '#ff9800',
        dark: getCSSVariable('--mui-warning-dark') || '#e65100',
        contrastText: getCSSVariable('--mui-warning-contrast') || '#ffffff',
      },
      info: {
        main: getCSSVariable('--mui-info-main') || '#0288d1',
        light: getCSSVariable('--mui-info-light') || '#03a9f4',
        dark: getCSSVariable('--mui-info-dark') || '#01579b',
        contrastText: getCSSVariable('--mui-info-contrast') || '#ffffff',
      },
      success: {
        main: getCSSVariable('--mui-success-main') || '#2e7d32',
        light: getCSSVariable('--mui-success-light') || '#4caf50',
        dark: getCSSVariable('--mui-success-dark') || '#1b5e20',
        contrastText: getCSSVariable('--mui-success-contrast') || '#ffffff',
      },
      grey: {
        50: getCSSVariable('--mui-grey-50') || '#fafafa',
        100: getCSSVariable('--mui-grey-100') || '#f5f5f5',
        200: getCSSVariable('--mui-grey-200') || '#eeeeee',
        300: getCSSVariable('--mui-grey-300') || '#e0e0e0',
        400: getCSSVariable('--mui-grey-400') || '#bdbdbd',
        500: getCSSVariable('--mui-grey-500') || '#9e9e9e',
        600: getCSSVariable('--mui-grey-600') || '#757575',
        700: getCSSVariable('--mui-grey-700') || '#616161',
        800: getCSSVariable('--mui-grey-800') || '#424242',
        900: getCSSVariable('--mui-grey-900') || '#212121',
      },
      background: {
        default:
          getCSSVariable('--mui-background-paper') ||
          (mode === 'dark' ? '#121212' : '#ffffff'),
        paper:
          getCSSVariable('--mui-background-paper') ||
          (mode === 'dark' ? '#1b1b1b' : '#f5f5f5'),
      },
      text: {
        primary:
          getCSSVariable('--mui-text-primary') ||
          (mode === 'dark' ? '#ffffff' : '#212121'),
        secondary:
          getCSSVariable('--mui-text-secondary') ||
          (mode === 'dark' ? '#bdbdbd' : '#757575'),
      },
    },
    typography: {
      fontFamily: [
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif',
      ].join(','),
      // Sense Typography - Desktop (default)
      h1: {
        fontSize: '48px',
        lineHeight: '52px',
        fontWeight: 700,
        letterSpacing: '-0.02em',
        '@media (max-width:767px)': {
          fontSize: '40px',
          lineHeight: '44px',
        },
      },
      h2: {
        fontSize: '40px',
        lineHeight: '48px',
        fontWeight: 700,
        letterSpacing: '-0.02em',
        '@media (max-width:767px)': {
          fontSize: '36px',
          lineHeight: '40px',
        },
      },
      h3: {
        fontSize: '36px',
        lineHeight: '40px',
        fontWeight: 700,
        letterSpacing: '-0.02em',
        '@media (max-width:767px)': {
          fontSize: '30px',
          lineHeight: '34px',
        },
      },
      h4: {
        fontSize: '24px',
        lineHeight: '28px',
        fontWeight: 400,
        '@media (max-width:767px)': {
          fontSize: '20px',
          lineHeight: '24px',
        },
      },
      h5: {
        fontSize: '20px',
        lineHeight: '24px',
        fontWeight: 400,
        '@media (max-width:767px)': {
          fontSize: '16px',
          lineHeight: '20px',
        },
      },
      h6: {
        fontSize: '16px',
        lineHeight: '20px',
        fontWeight: 400,
        '@media (max-width:767px)': {
          fontSize: '12px',
          lineHeight: '16px',
        },
      },
      body1: {
        fontSize: '20px',
        lineHeight: '24px',
        fontWeight: 400,
        '@media (max-width:767px)': {
          fontSize: '16px',
          lineHeight: '20px',
        },
      },
      body2: {
        fontSize: '16px',
        lineHeight: '20px',
        fontWeight: 400,
        '@media (max-width:767px)': {
          fontSize: '12px',
          lineHeight: '16px',
        },
      },
      caption: {
        fontSize: '12px',
        lineHeight: '16px',
        fontWeight: 400,
        '@media (max-width:767px)': {
          fontSize: '8px',
          lineHeight: '10px',
        },
      },
    },
    components: {
      MuiTypography: {
        styleOverrides: {
          root: {
            margin: 0,
          },
        },
      },
    },
  });
};
