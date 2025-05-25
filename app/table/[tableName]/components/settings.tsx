import React, { FC, JSX } from 'react';
import {
  Card,
  FormControlLabel,
  Grid,
  IconButton,
  Switch,
  tooltipClasses,
  Typography,
} from '@mui/material';
import BalanceIcon from '@mui/icons-material/Balance';
import VisibilityTwoToneIcon from '@mui/icons-material/VisibilityTwoTone';
import EditIcon from '@mui/icons-material/Edit';
import { useUsername } from '@/lib/use-username';
import Tooltip, { TooltipProps } from '@mui/material/Tooltip';
import { styled } from '@mui/system';
import { useIsModerator } from '@/lib/hooks/use-is-moderator';
import { useIsObserver } from '@/lib/hooks/use-is-observer';

const LightTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.common.white,
    color: 'rgba(0, 0, 0, 0.87)',
    // @ts-expect-error shadows exists
    boxShadow: theme.shadows[1],
    fontSize: 11,
  },
}));

interface SettingsProps {
  tableName: string;
}

export const Settings: FC<SettingsProps> = ({ tableName }): JSX.Element => {
  const { editUsername } = useUsername();
  const { isModerator, setIsModerator } = useIsModerator(tableName);
  const { isObserver, setIsObserver } = useIsObserver(tableName);
  return (
    <Grid
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
          <LightTooltip title="Only moderators can reveal the results or reset the state.">
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
          </LightTooltip>
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
          <LightTooltip title="Observers cannot vote, but can still see the results or be a moderator.">
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
          </LightTooltip>
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
    </Grid>
  );
};
