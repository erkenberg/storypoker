import React, { FC, JSX, useCallback } from 'react';
import {
  PlayerState,
  RemotePlayerState,
} from '@/app/table/[tableName]/state/player-state';
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
import { TableState } from '@/lib/supabase/table-state';
import { getValueColor } from '@/lib/value-helpers/value-colors';

interface UsernameInputProps {
  ownState: PlayerState;
  remotePlayerStates: RemotePlayerState[];
  revealed: boolean;
  tableState: TableState;
}

export const PlayerOverview: FC<UsernameInputProps> = ({
  ownState,
  remotePlayerStates,
  revealed,
  tableState,
}): JSX.Element => {
  const { editUsername } = useUsername();
  const getOfflineColor = useCallback(
    (state: RemotePlayerState) => (state.isOffline ? 'gray' : undefined),
    [],
  );
  const formatValue = useCallback(
    (state: PlayerState) =>
      revealed ? state.selectedValue : state.selectedValue != null ? '✓' : '',
    [revealed],
  );

  const ownColor =
    revealed && ownState.selectedValue
      ? getValueColor(ownState.selectedValue, tableState.values).regular
      : undefined;
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
            <TableCell
              sx={{
                padding: '8px',
                minWidth: '100px',
                color: ownColor,
                fontWeight:
                  revealed && ownState.selectedValue ? 'bold' : undefined,
              }}
            >
              {ownState.username}
            </TableCell>
            <TableCell
              align="right"
              sx={{
                padding: '8px',
                minWidth: '32px',
                fontWeight: 'bold',
                color: ownColor,
              }}
            >
              {formatValue(ownState)}
            </TableCell>
          </TableRow>
          {remotePlayerStates.map((state) => {
            const color =
              getOfflineColor(state) ??
              (revealed && state.selectedValue
                ? getValueColor(state.selectedValue, tableState.values).regular
                : undefined);
            return (
              <TableRow
                key={state.clientId}
                sx={{ color: getOfflineColor(state) }}
              >
                <TableCell sx={{ padding: '4px' }}>
                  {state.isOffline && (
                    <WifiOffIcon fontSize="small" sx={{ color: 'gray' }} />
                  )}
                </TableCell>
                <TableCell
                  sx={{
                    padding: '8px',
                    color,
                    fontWeight:
                      revealed && state.selectedValue ? 'bold' : undefined,
                  }}
                >
                  {state.username}
                </TableCell>
                <TableCell
                  align={'right'}
                  sx={{ padding: '8px', fontWeight: 'bold', color }}
                >
                  {formatValue(state)}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
