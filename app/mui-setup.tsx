'use client';

import { CssBaseline, ThemeProvider } from '@mui/material';
import { JSX, ReactNode } from 'react';
import { NextAppDirEmotionCacheProvider } from 'tss-react/next/appDir';

import { theme } from './theme';

type MuiSetupProps = {
  children: ReactNode;
};

export const MuiSetup = ({ children }: MuiSetupProps): JSX.Element => {
  return (
    <>
      <CssBaseline />
      <NextAppDirEmotionCacheProvider options={{ key: 'css' }}>
        <ThemeProvider theme={theme}>{children}</ThemeProvider>
      </NextAppDirEmotionCacheProvider>
    </>
  );
};
