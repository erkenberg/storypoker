import { useLocalStorage } from 'usehooks-ts';
import React, {
  Dispatch,
  JSX,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from 'react';
import { Button, FormLabel, Grid2, Stack, TextField } from '@mui/material';

interface UseUsernameResult {
  username: string;
  editUsername: Dispatch<SetStateAction<void>>;
  UsernameInput: (() => JSX.Element) | null;
}
export const useUsername = (): UseUsernameResult => {
  const [persistedUsername, setPersistedUsername] = useLocalStorage(
    'username',
    '',
  );
  // TODO: actually using localstorage for showUsernameInput is not required,
  //  but somehow useState doesn't properly update components relying on the value.
  const [showUsernameInput, setShowUsernameInput] = useLocalStorage(
    'showUsernameInput',
    persistedUsername.length === 0,
  );
  const setUsername = useCallback(
    (name: string): void => {
      setPersistedUsername(name);
      setShowUsernameInput(false);
    },
    [setPersistedUsername, setShowUsernameInput],
  );
  const editUsername = useCallback(() => {
    setShowUsernameInput(true);
  }, [setShowUsernameInput]);

  useEffect(() => {
    if (persistedUsername.length === 0) editUsername();
  }, [persistedUsername, editUsername]);

  const UsernameInput = (): JSX.Element => {
    const [tmpUsername, setTmpUsername] = useState(persistedUsername);
    const onFormSubmit = useCallback(
      () => setUsername(tmpUsername),
      [tmpUsername],
    );
    return (
      <Grid2
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
        style={{ minHeight: '100vh' }}
      >
        <form autoComplete="off" onSubmit={onFormSubmit}>
          <Stack direction="column" spacing={2} sx={{ maxWidth: '500px' }}>
            <FormLabel>Enter Name</FormLabel>
            <TextField
              required
              focused
              value={tmpUsername}
              onChange={(e): void => setTmpUsername(e.target.value)}
            />
            <Button type="submit">Submit</Button>
          </Stack>
        </form>
      </Grid2>
    );
  };

  return {
    username: persistedUsername,
    editUsername,
    UsernameInput: showUsernameInput ? UsernameInput : null,
  };
};
