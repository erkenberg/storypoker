'use client';

import React, { JSX, useCallback, useEffect, useMemo, useState } from 'react';
import {
  mergePlayerState,
  PlayerState,
} from '@/app/table/[tableName]/state/player-state';
import { TableState } from '@/lib/supabase/table-state';
import { Button, Grid, Stack, Typography } from '@mui/material';
import { useSupabaseChannel } from '@/lib/supabase/use-supabase-channel';
import { PlayerOverview } from '@/app/table/[tableName]/components/player-overview';
import { useClientId } from '@/lib/use-client-id';
import { useUsername } from '@/lib/hooks/use-username';
import { Results } from '@/app/table/[tableName]/components/results';
import { getValueColor } from '@/lib/value-helpers/value-colors';
import { setTableRevealed } from '@/lib/supabase/set-table-revealed';
import { getRandomImageIndex } from '@/app/table/[tableName]/components/images';
import { useLocalStorage } from 'usehooks-ts';

import { Settings } from '@/app/table/[tableName]/components/settings';
import { useIsModerator } from '@/lib/hooks/use-is-moderator';
import { useIsObserver } from '@/lib/hooks/use-is-observer';

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
  const { isModerator } = useIsModerator(tableName);
  const { isObserver } = useIsObserver(tableName);
  const [selectedValue, setSelectedValue] = useLocalStorage<string | null>(
    `${tableName}_selected`,
    null,
  );

  const ownState: PlayerState = useMemo(
    () => ({
      clientId,
      username,
      selectedValue,
      isModerator,
      isObserver,
    }),
    [clientId, username, selectedValue, isModerator, isObserver],
  );

  const [remotePlayerStates, setRemotePlayerStates] = useState<PlayerState[]>(
    [],
  );
  const mergedPlayerStates = useMemo(
    () => [ownState, ...remotePlayerStates],
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
    // Reset the selected value when becoming an observer
    if (isObserver) setSelectedValue(null);
  }, [isObserver, setSelectedValue]);

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

    return (): void => {
      cleanupBackendChannel();
    };
  }, [backendChannel, cleanupBackendChannel, tableName, resetPlayerStates]);

  useEffect(() => {
    realtimeChannel
      .on('presence', { event: 'sync' }, () => {
        const realTimeState = realtimeChannel.presenceState<PlayerState>();
        const remoteStates = Object.values(realTimeState)
          .map((state) => state[0])
          .filter((state) => state.clientId !== ownState.clientId);

        setRemotePlayerStates((oldRemoteStates) =>
          mergePlayerState(oldRemoteStates, remoteStates),
        );
      })
      .subscribe();
    return (): void => {
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
        .track({ ...ownState, timestamp: Date.now() })
        .catch(() => console.error('Error sending local state'));
    }
  }, [realtimeChannel, ownState]);

  // Small validation attempt, resetting the selected value when tampering with it in the local storage
  if (selectedValue && !tableState.values.includes(selectedValue)) {
    setSelectedValue(null);
  }

  const canReveal =
    mergedPlayerStates.some(({ selectedValue }) => selectedValue != null) &&
    !tableState.revealed &&
    (selectedValue !== null || isObserver) &&
    isModerator;

  return (
    <Grid container spacing={1.5}>
      <Grid container sx={{ width: '100%', marginTop: '12px' }} spacing={0}>
        <Typography
          component={'h1'}
          sx={{ fontWeight: 'bold', marginTop: 'auto', marginBottom: 'auto' }}
        >
          {tableName}
        </Typography>
        <Settings tableName={tableName} />
      </Grid>
      <Grid size={{ sm: 4, md: 3 }} sx={{ width: '100%' }}>
        <PlayerOverview
          playerStates={mergedPlayerStates}
          revealed={tableState.revealed}
          tableState={tableState}
        />
      </Grid>
      <Grid size={{ sm: 8, md: 9 }}>
        <Grid container>
          <Grid size={{ lg: 5 }} sx={{ marginBottom: '16px' }}>
            {tableState.values.map((value) => {
              const color = getValueColor(value, tableState.values);
              return (
                <Button
                  disabled={tableState.revealed || isObserver}
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
            {isModerator && (
              <Stack direction="row" spacing={4} sx={{ marginTop: '24px' }}>
                <Button
                  disabled={!canReveal}
                  variant={'contained'}
                  onClick={(): Promise<void> =>
                    setTableRevealed({
                      tableName,
                      revealed: true,
                      image_index: getRandomImageIndex(),
                    })
                  }
                >
                  Show Results
                </Button>
                <Button
                  variant={'contained'}
                  disabled={!isModerator || !tableState.revealed}
                  onClick={(): Promise<void> =>
                    setTableRevealed({ tableName, revealed: false })
                  }
                >
                  Reset
                </Button>
              </Stack>
            )}
          </Grid>
          <Grid size={{ lg: 4 }}>
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
