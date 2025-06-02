import React, { FC, JSX, useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import TextField from '@mui/material/TextField';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import { useUsername } from '@/lib/hooks/use-username';
import EditIcon from '@mui/icons-material/Edit';

export const UsernameDialog: FC = (): JSX.Element => {
  const { username, setUsername } = useUsername();
  const [open, setOpen] = useState(!username);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const newUsername = formData.get('username') as string;
    setUsername(newUsername);
    setOpen(false);
  };

  return (
    <>
      <Button
        onClick={() => setOpen(true)}
        disableRipple
        sx={{
          all: 'unset',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: 0.5,
        }}
      >
        {username}
        <EditIcon fontSize="inherit" sx={{ color: 'primary.main' }} />
      </Button>
      <Dialog
        open={open}
        onClose={(_, reason) => {
          // Don't close on background click if no username exists yet
          if (reason === 'backdropClick' && !username) return;
          setOpen(false);
        }}
        disableEscapeKeyDown={!username}
        slotProps={{ paper: { component: 'form', onSubmit: handleSubmit } }}
      >
        <DialogContent>
          <TextField
            sx={{ marginTop: 0 }}
            autoFocus
            required
            label="Your Name"
            name="username"
            defaultValue={username}
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          {username && <Button onClick={() => setOpen(false)}>Cancel</Button>}
          <Button type="submit">Save</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
