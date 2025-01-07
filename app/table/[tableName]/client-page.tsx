'use client';

import React, { JSX, useCallback, useEffect, useMemo, useState } from 'react';
import {
  mergePlayerState,
  PlayerState,
} from '@/app/table/[tableName]/state/player-state';
import { TableState } from '@/lib/supabase/table-state';
import { Button, Grid2, Stack } from '@mui/material';
import { useSupabaseChannel } from '@/lib/supabase/use-supabase-channel';
import { PlayerOverview } from '@/app/table/[tableName]/components/player-overview';
import { useClientId } from '@/lib/use-client-id';
import { useUsername } from '@/lib/use-username';
import { Results } from '@/app/table/[tableName]/components/results';
import { getValueColor } from '@/lib/value-helpers/value-colors';
import { setTableRevealed } from '@/lib/supabase/set-table-revealed';
import { getRandomImageIndex } from '@/app/table/[tableName]/components/images';
import { useLocalStorage } from 'usehooks-ts';

import { Settings } from '@/app/table/[tableName]/components/settings';

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
  const [isModerator, setIsModerator] = useLocalStorage(
    `${tableName}_isModerator`,
    false,
  );
  const [isObserver, setIsObserver] = useLocalStorage(
    `${tableName}_isObserver`,
    false,
  );
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

    return (): void => {
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
            isModerator: state[0].isModerator,
            isObserver: state[0].isObserver,
          }))
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
        .track(ownState)
        .catch(() => console.error('Error sending local state'));
    }
  }, [realtimeChannel, ownState]);

  const canReveal =
    mergedPlayerStates.some(({ selectedValue }) => selectedValue != null) &&
    !tableState.revealed &&
    (selectedValue !== null || isObserver) &&
    isModerator;

  return (
    <Grid2 container spacing={2}>
      <Grid2 container sx={{ width: '100%', marginTop: '2vh' }} spacing={2}>
        <Settings
          isModerator={isModerator}
          setIsModerator={setIsModerator}
          isObserver={isObserver}
          setIsObserver={(newIsObserver: boolean) => {
            if (newIsObserver) {
              setSelectedValue(null);
            }
            setIsObserver(newIsObserver);
          }}
        />
      </Grid2>
      <Grid2 size={{ sm: 4, md: 3 }} sx={{ width: '100%' }}>
        <PlayerOverview
          playerStates={mergedPlayerStates}
          revealed={tableState.revealed}
          tableState={tableState}
        />
      </Grid2>
      <Grid2 size={{ sm: 8, md: 9 }}>
        <Grid2 container>
          <Grid2 size={{ lg: 5 }} sx={{ marginBottom: '16px' }}>
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
          </Grid2>
          <Grid2 size={{ lg: 4 }}>
            {tableState.revealed && (
              <Results
                playerStates={mergedPlayerStates}
                tableState={tableState}
              />
            )}
          </Grid2>
        </Grid2>
      </Grid2>
    </Grid2>
  );
}
