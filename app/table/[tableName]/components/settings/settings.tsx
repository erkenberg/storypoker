import React, { FC, JSX } from 'react';
import {
  Card,
  FormControlLabel,
  Grid,
  Switch,
  tooltipClasses,
  Typography,
} from '@mui/material';
import BalanceIcon from '@mui/icons-material/Balance';
import VisibilityTwoToneIcon from '@mui/icons-material/VisibilityTwoTone';
import Tooltip, { TooltipProps } from '@mui/material/Tooltip';
import { styled } from '@mui/system';
import { useIsModerator } from '@/lib/hooks/use-is-moderator';
import { useIsObserver } from '@/lib/hooks/use-is-observer';
import {
  TableSettingsDialog,
  TableSettingsDialogProps,
} from './table-settings-dialog';

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

type SettingsProps = TableSettingsDialogProps;

export const Settings: FC<SettingsProps> = ({
  tableName,
  valueSets,
}): JSX.Element => {
  const { isModerator, setIsModerator } = useIsModerator(tableName);
  const { isObserver, setIsObserver } = useIsObserver(tableName);
  return (
    <Grid
      container
      component={Card}
      variant="outlined"
      width={'100%'}
      sx={{ padding: 1 }}
    >
      <Typography
        component={'h6'}
        sx={{
          marginTop: 'auto',
          marginBottom: 'auto',
          marginInlineEnd: 1,
        }}
      >
        Settings:
      </Typography>
      <Grid container spacing={1}>
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
        <TableSettingsDialog tableName={tableName} valueSets={valueSets} />
      </Grid>
    </Grid>
  );
};
