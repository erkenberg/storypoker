import React, { FC, JSX, useCallback } from 'react';
import { PlayerState } from '@/app/table/[tableName]/state/player-state';
import {
  TableCell,
  TableRow,
  Table,
  TableContainer,
  TableBody,
  TableHead,
  Paper,
} from '@mui/material';
import WifiOffIcon from '@mui/icons-material/WifiOff';
import BalanceIcon from '@mui/icons-material/Balance';
import { TableState } from '@/lib/supabase/get-table-state';
import { getValueColor } from '@/lib/value-helpers/value-colors';
import VisibilityTwoToneIcon from '@mui/icons-material/VisibilityTwoTone';
import { useClientId } from '@/lib/use-client-id';
import { UsernameDialog } from '@/app/table/[tableName]/components/settings/username-dialog';

interface UsernameInputProps {
  playerStates: PlayerState[];
  tableState: TableState;
}

export const PlayerOverview: FC<UsernameInputProps> = ({
  playerStates,
  tableState,
}): JSX.Element => {
  const clientId = useClientId();
  const { revealed, values } = tableState;
  const getOfflineColor = useCallback(
    (state: PlayerState) => (state.isOffline ? 'gray' : undefined),
    [],
  );
  const formatValue = useCallback(
    (state: PlayerState) =>
      revealed ? state.selectedValue : state.selectedValue != null ? '✓' : '',
    [revealed],
  );
  const players = playerStates.length;
  const activeUsers = playerStates.filter(
    ({ isObserver }) => !isObserver,
  ).length;
  const playersWithSelection = playerStates.filter(
    ({ selectedValue }) => selectedValue !== null,
  ).length;

  return (
    <TableContainer
      component={Paper}
      variant="outlined"
      sx={{ width: 'fit-content', margin: { xs: 'auto', sm: 'unset' } }}
    >
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell sx={{ padding: '4px' }}></TableCell>
            <TableCell sx={{ padding: '4px' }}></TableCell>
            <TableCell sx={{ padding: '4px', fontWeight: 'bold' }}>
              Player{players !== 1 ? 's' : ''} ({players})
            </TableCell>
            <TableCell
              align={'center'}
              sx={{ padding: '4px', fontWeight: 'bold' }}
            >
              Votes ({playersWithSelection}/{activeUsers})
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {playerStates
            .sort((a, b) =>
              a.isObserver === b.isObserver ? 0 : a.isObserver ? 1 : -1,
            )
            .map((state) => {
              const color =
                getOfflineColor(state) ??
                (revealed && state.selectedValue
                  ? getValueColor(state.selectedValue, values.values).regular
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
                  </TableCell>
                  <TableCell
                    sx={{
                      padding: '4px',
                      color,
                      fontWeight:
                        revealed && state.selectedValue ? 'bold' : undefined,
                    }}
                  >
                    {clientId === state.clientId ? (
                      <UsernameDialog />
                    ) : (
                      state.username
                    )}
                  </TableCell>
                  <TableCell
                    align={'center'}
                    sx={{
                      padding: '4px',
                      fontWeight: 'bold',
                      minWidth: '32px',
                      color,
                    }}
                  >
                    {state.isObserver && (
                      <VisibilityTwoToneIcon fontSize="inherit" />
                    )}
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
