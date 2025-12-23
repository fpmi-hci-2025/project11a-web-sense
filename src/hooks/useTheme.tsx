import { useState, useEffect, useMemo } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { createMUITheme } from '../styles/theme';

type ThemeMode = 'light' | 'dark';

export const useTheme = () => {
  const [mode, setMode] = useState<ThemeMode>(() => {
    try {
      const savedMode = localStorage.getItem('theme-mode') as ThemeMode | null;
      console.log('Retrieved theme from localStorage:', savedMode);
      if (savedMode) {
        return savedMode;
      }
      if (typeof window !== 'undefined' && window.matchMedia) {
        return window.matchMedia('(prefers-color-scheme: dark)').matches
          ? 'dark'
          : 'light';
      }
    } catch (error) {
      console.error('Error reading theme from localStorage:', error);
    }
    return 'light';
  });

  useEffect(() => {
    try {
      localStorage.setItem('theme-mode', mode);
      document.documentElement.setAttribute('data-theme', mode);
    } catch (error) {
      console.error('Error saving theme to localStorage:', error);
    }
  }, [mode]);

  const toggleTheme = () => {
    setMode((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  return { mode, setMode, toggleTheme };
};

export const AppThemeProvider = ({
  children,
  externalMode,
}: {
  children: React.ReactNode;
  externalMode?: 'light' | 'dark';
}) => {
  const { mode } = useTheme();

  const finalMode = externalMode || mode;

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', finalMode);
  }, [finalMode]);

  const theme = useMemo(() => createMUITheme(finalMode), [finalMode]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};
