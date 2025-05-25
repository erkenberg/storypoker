import { useLocalStorage } from 'usehooks-ts';
import { Dispatch, SetStateAction } from 'react';

export function useUsername(): {
  username: string;
  setUsername: Dispatch<SetStateAction<string>>;
  resetUsername: () => void;
} {
  const [username, setUsername, resetUsername] = useLocalStorage(
    `username`,
    '',
  );
  return { username, setUsername, resetUsername };
}
