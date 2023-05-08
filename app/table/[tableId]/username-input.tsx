import React, { JSX, FC, useState, useCallback } from 'react';
import { Button, FormLabel, Grid, Stack, TextField } from '@mui/material';

interface UsernameInputProps {
  onSubmit: (username: string) => void;
}

export const UsernameInput: FC<UsernameInputProps> = ({
  onSubmit,
}): JSX.Element => {
  const [username, setUsername] = useState('');
  const onFormSubmit = useCallback(
    () => onSubmit(username),
    [username, onSubmit],
  );
  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
      style={{ minHeight: '100vh' }}
    >
      <Grid item xs={3}>
        <form autoComplete="off" onSubmit={onFormSubmit}>
          <Stack direction="column" spacing={2} sx={{ maxWidth: '500px' }}>
            <FormLabel>Enter Name</FormLabel>
            <TextField
              required
              focused
              onChange={(e): void => setUsername(e.target.value)}
            />
            <Button type="submit">Submit</Button>
          </Stack>
        </form>
      </Grid>
    </Grid>
  );
};
