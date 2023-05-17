import { useLocalStorage } from 'usehooks-ts';
import { v4 as uuidv4 } from 'uuid';
import { useEffect } from 'react';

export const useClientId = (): string => {
  const [clientId, setClientId] = useLocalStorage('clientId', '');
  // NOTE: Apparently the initialValue is not persisted if no clientId exists.
  // Therefore, we use useEffect to check if the clientId is the empty default and set a new uuidv4 in that case.
  useEffect(() => {
    setClientId((old) => (old.length > 0 ? old : uuidv4()));
  }, [setClientId]);
  return clientId;
};
