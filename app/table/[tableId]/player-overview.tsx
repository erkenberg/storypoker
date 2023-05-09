import React, { FC, JSX } from 'react';
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
              {revealed
                ? ownState.selectedValue
                : ownState.selectedValue != null
                ? '✓'
                : ''}
            </TableCell>
          </TableRow>
          {remotePlayerStates.map((state) => (
            <TableRow
              key={state.clientId}
              sx={{ color: state.isOffline ? 'gray' : undefined }}
            >
              <TableCell
                sx={{
                  padding: '8px',
                  color: state.isOffline ? 'gray' : undefined,
                }}
              >
                {state.username}
              </TableCell>
              <TableCell
                align={'right'}
                sx={{ padding: '8px', fontWeight: 'bold' }}
              >
                {!state.isOffline && revealed
                  ? state.selectedValue
                  : !state.isOffline && state.selectedValue != null
                  ? '✓'
                  : ''}
                {state.isOffline && (
                  <WifiOffIcon sx={{ fontSize: '1em', color: 'gray' }} />
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
