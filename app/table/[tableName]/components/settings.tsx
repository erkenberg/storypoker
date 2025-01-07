import React, { FC, JSX } from 'react';
import {
  Card,
  FormControlLabel,
  Grid2,
  IconButton,
  Switch,
  Typography,
} from '@mui/material';
import BalanceIcon from '@mui/icons-material/Balance';
import VisibilityTwoToneIcon from '@mui/icons-material/VisibilityTwoTone';
import EditIcon from '@mui/icons-material/Edit';
import { useUsername } from '@/lib/use-username';

interface SettingsProps {
  isModerator: boolean;
  setIsModerator: (isModerator: boolean) => void;
  isObserver: boolean;
  setIsObserver: (isObserver: boolean) => void;
}

export const Settings: FC<SettingsProps> = ({
  isModerator,
  setIsModerator,
  isObserver,
  setIsObserver,
}): JSX.Element => {
  const { editUsername } = useUsername();

  return (
    <Grid2
      container
      component={Card}
      variant="outlined"
      spacing={{ xs: 0.4, sm: 3 }}
      width={'100%'}
      padding={1.5}
      direction={{ xs: 'column', sm: 'row' }}
    >
      <Typography component={'h6'} sx={{ fontWeight: 'bold' }}>
        Settings:
      </Typography>
      <FormControlLabel
        control={
          <Switch
            size="small"
            checked={isModerator}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setIsModerator(event.target.checked);
            }}
          />
        }
        label={
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              flexWrap: 'wrap',
            }}
          >
            <BalanceIcon fontSize="inherit" sx={{ marginRight: '2px' }} />
            Moderator
          </div>
        }
      />
      <FormControlLabel
        control={
          <Switch
            size="small"
            checked={isObserver}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setIsObserver(event.target.checked);
            }}
          />
        }
        label={
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              flexWrap: 'wrap',
            }}
          >
            <VisibilityTwoToneIcon
              fontSize="inherit"
              sx={{ marginRight: '2px' }}
            />
            Observer
          </div>
        }
      />
      <FormControlLabel
        control={
          <IconButton
            aria-label="change username"
            size="small"
            color="primary"
            sx={{ padding: '0', minWidth: '40px' }}
            onClick={(): void => editUsername()}
          >
            <EditIcon fontSize="inherit" />
          </IconButton>
        }
        label={
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              flexWrap: 'wrap',
            }}
          >
            Change name
          </div>
        }
      />
    </Grid2>
  );
};
