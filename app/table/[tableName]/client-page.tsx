'use client';

import React, { JSX, useCallback, useEffect, useMemo, useState } from 'react';
import {
  mergeRemotePlayerState,
  PlayerState,
  RemotePlayerState,
} from '@/app/table/[tableName]/state/player-state';
import { TableState } from '@/lib/supabase/table-state';
import { Button, Grid, Stack } from '@mui/material';
import { useSupabaseChannel } from '@/lib/supabase/use-supabase-channel';
import { PlayerOverview } from '@/app/table/[tableName]/components/player-overview';
import { useClientId } from '@/lib/use-client-id';
import { useUsername } from '@/lib/use-username';
import { Results } from '@/app/table/[tableName]/components/results';
import { getValueColor } from '@/lib/value-helpers/value-colors';
import { setTableRevealed } from '@/lib/supabase/set-table-revealed';
import { getRandomImageIndex } from '@/app/table/[tableName]/components/images';
import { useLocalStorage } from 'usehooks-ts';

interface ClientPageProps {
  tableName: string;
  initialTableState: TableState;
}

export default function ClientPage({
  tableName,
  initialTableState,
}: ClientPageProps): JSX.Element {
  const clientId = useClientId();
  const { username } = useUsername();
  const [selectedValue, setSelectedValue] = useLocalStorage<string | null>(
    `${tableName}_selected`,
    null,
  );

  const ownState = useMemo(
    () => ({
      clientId,
      username,
      selectedValue,
    }),
    [clientId, username, selectedValue],
  );

  const [remotePlayerStates, setRemotePlayerStates] = useState<
    RemotePlayerState[]
  >([]);
  const mergedPlayerStates = useMemo(
    () => [ownState, ...remotePlayerStates.filter((state) => !state.isOffline)],
    [ownState, remotePlayerStates],
  );
  const [tableState, setTableState] = useState<TableState>(initialTableState);
  const [backendChannel, cleanupBackendChannel] = useSupabaseChannel(
    `table-${tableName}-backend`,
  );

  const [realtimeChannel, cleanupRealtimeChannel] = useSupabaseChannel(
    `table-${tableName}-realtime`,
  );
  const resetPlayerStates = useCallback(() => {
    setSelectedValue(null);
    setRemotePlayerStates((oldStates) =>
      oldStates.map((state) =>
        state.isOffline ? { ...state, selectedValue: null } : state,
      ),
    );
  }, [setRemotePlayerStates, setSelectedValue]);

  useEffect(() => {
    backendChannel
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'tables',
          filter: `name=eq.${tableName}`,
        },
        ({ new: newState }: { new: TableState }) => {
          setTableState((old) => {
            // NOTE: somehow tableState.revealed is always false in the subscription callback, therefore
            // we check this in the setTableState callback where the oldValue is correct.
            if (old.revealed && !newState.revealed) {
              resetPlayerStates();
            }
            return newState;
          });
          //TODO: handle updating ownState if selected value doesn't exist anymore
        },
      )
      .subscribe();

    return () => {
      cleanupBackendChannel();
    };
  }, [backendChannel, cleanupBackendChannel, tableName, resetPlayerStates]);

  useEffect(() => {
    realtimeChannel
      .on('presence', { event: 'sync' }, () => {
        const realTimeState = realtimeChannel.presenceState<PlayerState>();
        const remoteStates = Object.values(realTimeState)
          .map((state) => ({
            clientId: state[0].clientId,
            username: state[0].username,
            selectedValue: state[0].selectedValue,
          }))
          .filter((state) => state.clientId !== ownState.clientId);

        setRemotePlayerStates((oldRemoteStates) =>
          mergeRemotePlayerState(oldRemoteStates, remoteStates),
        );
      })
      .subscribe();
    return () => {
      cleanupRealtimeChannel();
    };
  }, [
    realtimeChannel,
    cleanupRealtimeChannel,
    ownState.clientId,
    resetPlayerStates,
  ]);

  useEffect(() => {
    if (ownState.username.length > 0) {
      realtimeChannel
        .track(ownState)
        .catch(() => console.error('Error sending local state'));
    }
  }, [realtimeChannel, ownState]);

  // useEffect(() => {
  //   setOwnState((oldState) => ({ ...oldState, username }));
  // }, [username]);

  return (
    <Grid
      container
      spacing={2}
      sx={{
        marginTop: '10vh',
      }}
    >
      <Grid item xs={12} sm={4} md={3} sx={{ width: '100%' }}>
        <PlayerOverview
          ownState={ownState}
          remotePlayerStates={remotePlayerStates}
          revealed={tableState.revealed}
          tableState={tableState}
        />
      </Grid>
      <Grid item xs={12} sm={8} md={9}>
        <Grid container>
          <Grid item xs={12} lg={5} sx={{ marginBottom: '16px' }}>
            {tableState.values.map((value) => {
              const color = getValueColor(value, tableState.values);
              return (
                <Button
                  disabled={tableState.revealed}
                  key={value}
                  variant={selectedValue !== value ? 'outlined' : 'contained'}
                  value={value}
                  sx={{
                    height: '100px',
                    minWidth: '70px',
                    margin: '4px',
                    borderColor: color.regular,
                    color: selectedValue !== value ? color.regular : undefined,
                    WebkitTextStroke:
                      selectedValue !== value || tableState.revealed
                        ? `0.5px ${color.dark}`
                        : undefined,
                    backgroundColor:
                      selectedValue === value ? color.regular : undefined,
                    '&.MuiButtonBase-root:hover': {
                      backgroundColor:
                        selectedValue === value ? color.dark : undefined,
                      borderColor: color.dark,
                    },
                    fontSize: '1.4em',
                  }}
                  onClick={({ currentTarget }): void => {
                    setSelectedValue((oldValue) =>
                      oldValue === value ? null : currentTarget.value,
                    );
                  }}
                >
                  {value}
                </Button>
              );
            })}
            <Stack direction="row" spacing={4} sx={{ marginTop: '24px' }}>
              <Button
                disabled={tableState.revealed || selectedValue === null}
                variant={'contained'}
                onClick={(): Promise<void> =>
                  setTableRevealed({
                    tableName,
                    revealed: true,
                    image_index: getRandomImageIndex(),
                  })
                }
              >
                Reveal
              </Button>
              <Button
                variant={'contained'}
                disabled={!tableState.revealed}
                onClick={(): Promise<void> =>
                  setTableRevealed({ tableName, revealed: false })
                }
              >
                Reset
              </Button>
            </Stack>
          </Grid>
          <Grid item xs={12} lg={4}>
            {tableState.revealed && (
              <Results
                playerStates={mergedPlayerStates}
                tableState={tableState}
              />
            )}
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
