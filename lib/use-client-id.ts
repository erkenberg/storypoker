import { useLocalStorage } from 'usehooks-ts';
import { v4 as uuidv4 } from 'uuid';
import { useEffect } from 'react';

const id = uuidv4();

export const useClientId = (): string => {
  const [clientId, setClientId] = useLocalStorage<string>('clientId', id);

  // NOTE: Apparently the initialValue is not always persisted if no clientId
  // already entry exists in the local storage.
  // Therefore, we use useEffect to check if the clientId exists and set the persistant ID only in this case.
  // This persists it to the localstorage, so that reloads now use the persisted UUID (id would be different now)
  useEffect(() => {
    setClientId((old) => old ?? id);
  }, [setClientId]);
  return clientId;
};
