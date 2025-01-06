import React, { FC, JSX, useCallback } from 'react';
import { PlayerState } from '@/app/table/[tableName]/state/player-state';
import {
  Card,
  TableCell,
  TableRow,
  Table,
  TableContainer,
  TableBody,
} from '@mui/material';
import WifiOffIcon from '@mui/icons-material/WifiOff';
import BalanceIcon from '@mui/icons-material/Balance';
import { TableState } from '@/lib/supabase/table-state';
import { getValueColor } from '@/lib/value-helpers/value-colors';
import VisibilityTwoToneIcon from '@mui/icons-material/VisibilityTwoTone';

interface UsernameInputProps {
  playerStates: PlayerState[];
  revealed: boolean;
  tableState: TableState;
}

export const PlayerOverview: FC<UsernameInputProps> = ({
  playerStates,
  revealed,
  tableState,
}): JSX.Element => {
  const getOfflineColor = useCallback(
    (state: PlayerState) => (state.isOffline ? 'gray' : undefined),
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
          {playerStates
            .sort((a, b) =>
              a.isObserver === b.isObserver ? 0 : a.isObserver ? 1 : -1,
            )
            .map((state) => {
              const color =
                getOfflineColor(state) ??
                (revealed && state.selectedValue
                  ? getValueColor(state.selectedValue, tableState.values)
                      .regular
                  : undefined);
              return (
                <TableRow
                  key={state.clientId}
                  sx={{ color: getOfflineColor(state) }}
                >
                  <TableCell sx={{ padding: '4px' }}>
                    {state.isOffline && (
                      <WifiOffIcon fontSize="inherit" sx={{ color: 'gray' }} />
                    )}
                  </TableCell>
                  <TableCell sx={{ padding: '4px' }}>
                    {state.isModerator && <BalanceIcon fontSize="inherit" />}
                    {state.isObserver && (
                      <VisibilityTwoToneIcon fontSize="inherit" />
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
                    sx={{
                      padding: '8px',
                      fontWeight: 'bold',
                      minWidth: '32px',
                      color,
                    }}
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
