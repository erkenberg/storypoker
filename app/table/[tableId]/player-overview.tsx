import React, { FC, JSX, useCallback } from 'react';
import {
  PlayerState,
  RemotePlayerState,
} from '@/app/table/[tableId]/player-state';
import {
  Card,
  TableCell,
  TableRow,
  Table,
  TableContainer,
  TableBody,
} from '@mui/material';
import WifiOffIcon from '@mui/icons-material/WifiOff';
interface UsernameInputProps {
  ownState: PlayerState;
  remotePlayerStates: RemotePlayerState[];
  revealed: boolean;
}

export const PlayerOverview: FC<UsernameInputProps> = ({
  ownState,
  remotePlayerStates,
  revealed,
}): JSX.Element => {
  const getColor = useCallback(
    (state: RemotePlayerState) => (state.isOffline ? 'gray' : undefined),
    [],
  );
  const formatValue = useCallback(
    (state: PlayerState) =>
      revealed ? state.selectedValue : state.selectedValue != null ? '✓' : '',
    [revealed],
  );

  return (
    <TableContainer
      component={Card}
      sx={{ width: 'fit-content', margin: 'auto' }}
    >
      <Table size="small">
        <TableBody>
          <TableRow key={ownState.clientId}>
            <TableCell sx={{ padding: '8px', minWidth: '100px' }}>
              {ownState.username}
            </TableCell>
            <TableCell
              align="right"
              sx={{ padding: '8px', minWidth: '32px', fontWeight: 'bold' }}
            >
              {formatValue(ownState)}
            </TableCell>
          </TableRow>
          {remotePlayerStates
            .filter((state) => state.username.length > 0)
            .map((state) => (
              <TableRow key={state.clientId} sx={{ color: getColor(state) }}>
                <TableCell sx={{ padding: '8px', color: getColor(state) }}>
                  {state.isOffline && (
                    <WifiOffIcon sx={{ fontSize: '1em', color: 'gray' }} />
                  )}
                  {state.username}
                </TableCell>
                <TableCell
                  align={'right'}
                  sx={{
                    padding: '8px',
                    fontWeight: 'bold',
                    color: getColor(state),
                  }}
                >
                  {formatValue(state)}
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
