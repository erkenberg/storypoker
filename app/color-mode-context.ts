import { createContext } from 'react';

export const ColorModeContext = createContext({
  toggleColorMode: (): void => {
    return;
  },
});
