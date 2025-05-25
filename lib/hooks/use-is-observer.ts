import { useLocalStorage } from 'usehooks-ts';
import { Dispatch, SetStateAction } from 'react';

export function useIsObserver(tableName: string): {
  isObserver: boolean;
  setIsObserver: Dispatch<SetStateAction<boolean>>;
  resetIsObserver: () => void;
} {
  const [isObserver, setIsObserver, resetIsObserver] = useLocalStorage(
    `${tableName}_isObserver`,
    false,
  );
  return { isObserver, setIsObserver, resetIsObserver };
}
