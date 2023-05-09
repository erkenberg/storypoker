'use client';

import {
  createTheme,
  CssBaseline,
  ThemeProvider,
  useMediaQuery,
} from '@mui/material';
import { JSX, ReactNode, useMemo, useState } from 'react';
import { NextAppDirEmotionCacheProvider } from 'tss-react/next/appDir';

import { ColorModeContext } from '@/app/color-mode-context';

type MuiSetupProps = {
  children: ReactNode;
};

export const MuiSetup = ({ children }: MuiSetupProps): JSX.Element => {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  const [mode, setMode] = useState<'light' | 'dark'>(
    prefersDarkMode ? 'dark' : 'light',
  );
  const colorMode = useMemo(
    () => ({
      toggleColorMode: (): void => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
      },
    }),
    [],
  );

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: mode ?? prefersDarkMode,
        },
      }),
    [mode, prefersDarkMode],
  );
  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <NextAppDirEmotionCacheProvider options={{ key: 'css' }}>
          {children}
        </NextAppDirEmotionCacheProvider>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};
