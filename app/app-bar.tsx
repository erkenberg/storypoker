'use client';
import { JSX, useContext } from 'react';

import {
  Toolbar,
  IconButton,
  Typography,
  AppBar as MuiAppBar,
  useTheme,
} from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { ColorModeContext } from '@/app/color-mode-context';
import Link from 'next/link';

export function AppBar(): JSX.Element {
  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);
  return (
    <MuiAppBar position="static">
      <Toolbar>
        <Link href="/" style={{ textDecoration: 'inherit', color: 'inherit' }}>
          <Typography variant="h6" component="div">
            StoryPoker
          </Typography>
        </Link>
        <IconButton
          sx={{ marginLeft: 'auto' }}
          onClick={colorMode.toggleColorMode}
          color="inherit"
        >
          {theme.palette.mode === 'dark' ? (
            <Brightness7Icon />
          ) : (
            <Brightness4Icon />
          )}
        </IconButton>
      </Toolbar>
    </MuiAppBar>
  );
}
