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

export function AppBar(): JSX.Element {
  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);
  return (
    <MuiAppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          StoryPoker
        </Typography>
        <IconButton
          sx={{ ml: 1 }}
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
