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
  IconButton,
} from '@mui/material';
import WifiOffIcon from '@mui/icons-material/WifiOff';
import EditIcon from '@mui/icons-material/Edit';
import { useUsername } from '@/lib/use-username';

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
  const { editUsername } = useUsername();
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
            <TableCell sx={{ padding: '4px' }}>
              <IconButton
                aria-label="edit username"
                size="small"
                color="primary"
                sx={{ padding: '0' }}
                onClick={(): void => editUsername()}
              >
                <EditIcon fontSize="small" />
              </IconButton>
            </TableCell>
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
          {remotePlayerStates.map((state) => (
            <TableRow key={state.clientId} sx={{ color: getColor(state) }}>
              <TableCell sx={{ padding: '4px' }}>
                {state.isOffline && (
                  <WifiOffIcon fontSize="small" sx={{ color: 'gray' }} />
                )}
              </TableCell>
              <TableCell sx={{ padding: '8px', color: getColor(state) }}>
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
