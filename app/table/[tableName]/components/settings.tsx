import React, { FC, JSX, useState } from 'react';
import {
  FormControlLabel,
  FormHelperText,
  IconButton,
  Switch,
  Typography,
} from '@mui/material';
import BalanceIcon from '@mui/icons-material/Balance';
import VisibilityTwoToneIcon from '@mui/icons-material/VisibilityTwoTone';

import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import TextField from '@mui/material/TextField';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import { useIsModerator } from '@/lib/hooks/use-is-moderator';
import { useIsObserver } from '@/lib/hooks/use-is-observer';
import { useUsername } from '@/lib/hooks/use-username';
import SettingsIcon from '@mui/icons-material/Settings';

interface SettingsProps {
  tableName: string;
}

export const Settings: FC<SettingsProps> = ({ tableName }): JSX.Element => {
  const { username, setUsername } = useUsername();

  const [open, setOpen] = React.useState(!username);
  const openDialog = (): void => setOpen(true);
  const closeDialog = (): void => setOpen(false);

  const { isModerator, setIsModerator } = useIsModerator(tableName);
  const { isObserver, setIsObserver } = useIsObserver(tableName);

  // Using useState works better than FormData
  // We don't overwrite these values directly as we only want to do so on submit
  const [pendingIsModerator, setPendingIsModerator] = useState(isModerator);
  const [pendingIsObserver, setPendingIsObserver] = useState(isObserver);
  const [pendingUsername, setPendingUsername] = useState(username);

  return (
    <>
      <IconButton onClick={openDialog} color="primary">
        <SettingsIcon fontSize="small" />
        <Typography component={'h2'} sx={{ marginLeft: 1 }}>
          Settings
        </Typography>
      </IconButton>
      <Dialog
        open={open}
        onClose={(_, reason) => {
          if (reason === 'backdropClick' && !username) return;
          closeDialog();
        }}
        disableEscapeKeyDown={!username}
        slotProps={{
          paper: {
            component: 'form',
            onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
              event.preventDefault();
              setIsModerator(pendingIsModerator);
              setIsObserver(pendingIsObserver);
              setUsername(pendingUsername);
              closeDialog();
            },
          },
        }}
      >
        <DialogTitle sx={{ paddingBottom: 0 }}>Settings</DialogTitle>
        <DialogContent>
          <TextField
            sx={{ marginTop: 0 }}
            autoFocus
            required
            label="Username"
            value={pendingUsername}
            onChange={({ target }) => setPendingUsername(target.value)}
            fullWidth
            variant="standard"
          />
          <FormControlLabel
            control={
              <Switch
                checked={pendingIsModerator}
                onChange={({ target }) => setPendingIsModerator(target.checked)}
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
          <FormHelperText sx={{ marginTop: -1 }}>
            Only moderators can reveal the results or reset the state.
          </FormHelperText>
          <FormControlLabel
            control={
              <Switch
                checked={pendingIsObserver}
                onChange={({ target }) => setPendingIsObserver(target.checked)}
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
          <FormHelperText sx={{ marginTop: -1 }}>
            Observers cannot vote, but can still see the results or be a
            moderator.
          </FormHelperText>
        </DialogContent>
        <DialogActions>
          {username && <Button onClick={closeDialog}>Cancel</Button>}
          <Button type="submit">Save</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
