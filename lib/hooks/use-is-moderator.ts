import { useLocalStorage } from 'usehooks-ts';
import { Dispatch, SetStateAction } from 'react';

export function useIsModerator(tableName: string): {
  isModerator: boolean;
  setIsModerator: Dispatch<SetStateAction<boolean>>;
  resetIsModerator: () => void;
} {
  const [isModerator, setIsModerator, resetIsModerator] = useLocalStorage(
    `${tableName}_isModerator`,
    false,
  );
  return { isModerator, setIsModerator, resetIsModerator };
}
